import { useEffect, useState, type JSX } from "react";
import type { ReAsyncGenerator } from "./useAsyncGenerator";

interface AsyncGeneratorProps<T,E,N = undefined,A = undefined> {
    generator: (args?:A) => ReAsyncGenerator<T,N>;
    args?: A,
    error?: E,
    init?: T
}

export default function AsyncGeneratorWalker<T extends JSX.Element,E,N,A>(props: AsyncGeneratorProps<T,E,N,A>) {

    const [gen] = useState(() => props.generator(props.args));
    const [value, setValue] = useState(props.init);
    
    useEffect(() => {
        const a = async () => {

            let result = await gen.next();
            while (!result.done) {
                console.log("yielded value:", result.value);
                setValue(result.value);
                result = await gen.next();
            }
        }

        a()

    },[gen])

    
    return <div>
        {value}
    </div>
}