import { useRef, useState } from "react";

export default function useGenerator<T>(gen: Generator<T>){

    const ref = useRef(gen);

    // to avoid calling next() on the generator on every render, we will use a ref to store the generator
    const firstcallRef = useRef(true);

    const temp = firstcallRef.current ? ref.current.next() : undefined;

    const current = useRef<T>(temp?.value as T);
    const doneRef = useRef(temp?.done || false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, set] = useState(false);

    const updater = () => {
        console.log("updater called");
        const { done, value} = ref.current.next();
        doneRef.current = done || false;
        if(value)
            current.current = value;


        // make this custom hook re-render
        set((prev) => !prev);
    }

    // we will return current value, a function to advance the generator, and a state to indicate if the generator is done

    firstcallRef.current = false;
    return [current.current,updater, doneRef.current] as const;
}