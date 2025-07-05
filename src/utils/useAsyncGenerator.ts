import { useCallback, useRef, useState } from "react";

type ReAsyncGenerator<T,A = void> = AsyncGenerator<T,T,A>

interface AsyncGeneratorHook<T, N = void, Error = undefined> {
    content: T | undefined;
    done: boolean;
    pending: boolean;
    error: Error | null;
    next: (args: N) => Promise<void>;
}

export default function useAsyncGeneratorWalker<T, N = void, E = undefined>(gen: () => ReAsyncGenerator<T, N>) {

    const ref = useRef<ReturnType<typeof gen>>(null);

    if(!ref.current) {
        ref.current = gen();
    }

    const [error, setError] = useState<Error | null>(null);
    const [content, setContent] = useState<T | undefined>(undefined);
    const [pending, setPending] = useState(false);
    const [done, setDone] = useState(false);

    const next = useCallback(async (args: N) => {
        if(!ref.current) return;
        setPending(true);

        try {
            const { value, done } = await ref.current.next(args);
            if(done) {
                setDone(true);
                return;
            }

            if(value !== undefined) {
                setContent(value);
            } else if(!done) {
                setContent(undefined);
            }

        } catch (err) {
            setError(err as Error);
            setContent(undefined);
            setDone(true);
            console.error("Error in async generator:", err);
        } finally {
            setPending(false);
        }
        
    },[])

    return {
        content,
        done,
        pending,
        error,
        next
    } as AsyncGeneratorHook<T, N, E>;

}