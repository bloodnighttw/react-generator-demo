import { useCallback, useRef, useState } from "react";

type MayVoid<T> = T | void;

type ReAsyncGenerator<T, A = void> = AsyncGenerator<T, MayVoid<T>, A>;

interface AsyncGeneratorHookWithArgs<T, A = void, Error = undefined> {
  content: T | undefined;
  done: boolean;
  pending: boolean;
  error: Error | null;
  next: (args: A) => Promise<void>;
}

interface AsyncGeneratorHookWithoutArgs<T, Error = undefined> {
  content: T | undefined;
  done: boolean;
  pending: boolean;
  error: Error | null;
  next: () => Promise<void>;
}

export type AsyncGeneratorHook<T, A = unknown, Error = undefined> =
  | AsyncGeneratorHookWithArgs<T, A, Error>
  | AsyncGeneratorHookWithoutArgs<T, Error>;

// E => Error
// T => yield *T* or return *T*
// A => the generator function argument type
// N => next function argument type, which is also the what yield returns in generator
export default function useAsyncGeneratorWalker<
  E = undefined,
  T = unknown,
  A = unknown,
  N = void
>(gen: (args?: A) => ReAsyncGenerator<T, N>, args?: A) {
  const ref = useRef<ReturnType<typeof gen>>(null);

  if (!ref.current) {
    ref.current = gen(args);
  }

  const [error, setError] = useState<Error | null>(null);
  const [content, setContent] = useState<T | undefined>(undefined);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  const next = useCallback(async (args: N) => {
    if (!ref.current) return;
    setPending(true);

    try {
      const { value, done } = await ref.current.next(args);
      if (done) {
        setDone(true);
        return;
      }

      if (value !== undefined) {
        setContent(value);
      } else if (!done) {
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
  }, []);

  return {
    content,
    done,
    pending,
    error,
    next,
  } as AsyncGeneratorHook<T, N, E>;
}
