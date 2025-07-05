import { useCallback, useRef, useState } from "react";

type MayVoid<T> = T | void;

export type ReGenerator<T,A = unknown> = Generator<T, MayVoid<T>, A> ;

export default function useGenerator<T,A = void>(gen: ReGenerator<T,A>) {

    const ref = useRef(gen);

    // to avoid calling next() on the generator on every render, we will use a ref to store the generator
    const firstcallRef = useRef(true);

    const temp = firstcallRef.current ? ref.current.next() : undefined;

    const current = useRef<T>(temp?.value as T);
    const doneRef = useRef(temp?.done || false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, set] = useState(0);

    const updater = useCallback((args: A) => {
        console.log("updater called");
        const { done, value} = ref.current.next(args);
        doneRef.current = done || false;
        if(done && value){
            current.current = value;
        } else if(!done) {
            current.current = value;
        }

        // make this custom hook re-render
        set((prev) => prev+1);
    },[])

    // we will return current value, a function to advance the generator, and a state to indicate if the generator is done

    firstcallRef.current = false;
    return [current.current,updater, doneRef.current] as const;
}
