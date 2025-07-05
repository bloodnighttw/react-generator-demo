import { useCallback, useRef, useState } from "react";

type MayVoid<T> = T | void;

interface GeneratorHook<T, A = void> {
  done: boolean;
  state: T;
  next: (args: A) => void;
}

export type ReGenerator<T, A = unknown> = Generator<T, MayVoid<T>, A>;

export default function useGenerator<T, A = void>(
  genFunc: () => ReGenerator<T, A>
): GeneratorHook<T, A>;

export default function useGenerator<T, A = void, B = undefined>(
  genFunc: (args: B) => ReGenerator<T, A>,
  args: B
): GeneratorHook<T, A>;

export default function useGenerator<T, A = void, B = undefined>(
  genFunc: (args?: B) => ReGenerator<T, A>,
  args?: B
) {
  const generatorData = useRef<{
    generator: ReGenerator<T, A> | null;
    initialValue: T;
    initialDone: boolean;
  } | null>(null);

  // Initialize once - works for both SSR and client
  if (generatorData.current === null) {
    // Initialize generator and get first value synchronously
    // This works in both SSR and client environments
    const initializeGenerator = () => {
      const generator = genFunc(args);
      const result = generator.next();
      return {
        generator,
        initialValue: result.value as T,
        initialDone: result.done || false,
      };
    };
    generatorData.current = initializeGenerator();
  }

  const [state, setState] = useState<T>(generatorData.current.initialValue);
  const [done, setDone] = useState<boolean>(generatorData.current.initialDone);

  const next = useCallback((args: A) => {
    if (!generatorData.current?.generator) return;

    const { done: isDone, value } = generatorData.current.generator.next(args);
    const newDone = isDone || false;

    setDone(newDone);

    if (newDone && value !== undefined) {
      setState(value);
    } else if (!newDone) {
      setState(value);
    }
  }, []);

  return {
    done,
    state,
    next,
  };
}
