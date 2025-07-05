import { useCallback, useRef, useState } from "react";

type MayVoid<T> = T | void;

interface GeneratorHook<T,A = void> {
    done: boolean;
    state: T;
    next: (args: A) => void;
}

export type ReGenerator<T,A = unknown> = Generator<T, MayVoid<T>, A> ;

export default function useGenerator<T,A = void>(genFunc: ()=> ReGenerator<T,A>): GeneratorHook<T,A>;

export default function useGenerator<T,A = void, B = undefined>(genFunc: (args: B)=>ReGenerator<T,A>, args: B): GeneratorHook<T,A>;

export default function useGenerator<T,A = void, B = undefined>(genFunc: (args?: B)=>ReGenerator<T,A>, args?: B) {

    const ref = useRef<ReGenerator<T,A>>(null);
    const current = useRef<T>(null);
    const doneRef = useRef(false);

    // if the generator is not initialized, initialize it
    // this will only happen once, when the component is mounted
    // and will not be called again unless the component is unmounted and mounted again
    if(ref.current === null) {
        ref.current = genFunc(args);
        const temp = ref.current.next();
        current.current = temp.value as T;
        doneRef.current = temp.done || false;
    }    

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, set] = useState(0);

    const updater = useCallback((args: A) => {
        console.log("updater called");
        const { done, value} = ref.current!.next(args);
        doneRef.current = done || false;
        if(done && value){
            current.current = value;
        } else if(!done) {
            current.current = value;
        }

        // make this custom hook re-render
        set((prev) => prev+1);
    },[])

    return {
        done: doneRef.current,
        state: current.current,
        next: updater,
    }
}
