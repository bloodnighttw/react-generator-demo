import { useEffect, useRef, useState } from "react";

export default function useAsyncGeneratorWalker<T, U = undefined>(gen: AsyncGenerator<T>, init?: U) {

    const ref = useRef(gen);
    const [content, setContent] = useState<T | U | undefined>(init);
    const [pending, setPending] = useState(true);

    useEffect(() => {

        const handler = (promise?: Promise<IteratorResult<T>>) => {
            console.log("handler called");

            if (!promise) return handler(ref.current.next());
           
            promise.then((result) => {

                const { done, value } = result;
                console.log("result", value, done);
                if(value)
                    setContent(value);
                if (!done) {
                    handler(ref.current.next());
                } else {
                    setPending(false);
                }
            })
   
        }
        handler()

    },[gen])
        
    return [content, pending] as const;

}