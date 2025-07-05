import type { JSX } from "react";
import useAbortSignal from "./utils/useAbortController";
import useAsyncGenerator, { type ReAsyncGenerator } from "./utils/useAsyncGenerator";
import waitTime from "./utils/waitTime";

interface Props {
  signal: AbortSignal;
}

async function* asyncGenerator(args: Props): ReAsyncGenerator<JSX.Element> {
  const ms = 1500;
  const { signal } = args;

  yield <div className="text-4xl text-amber-300">hi</div>;
  await waitTime({ ms, signal });
  const i = yield <div className="text-4xl text-amber-500">hello</div>;
  await waitTime({ ms, signal });
  yield <div className="text-4xl text-amber-700">world {i ?? 'undefined'}</div>;
  await waitTime({ ms, signal });
  yield <div className="text-4xl text-amber-900">!</div>;
  await waitTime({ ms, signal });
  yield <div className="text-4xl text-amber-400">done</div>;
  await waitTime({ ms, signal });
  return <div className="text-4xl text-amber-600">finished</div>;
}

export function AsyncGenerator() {
  const signal = useAbortSignal();
  const { content, done, next, pending } = useAsyncGenerator(asyncGenerator, { signal });

  return <div>
    {content}
    <button onClick={() => next()} disabled={done || pending}>
      {done ? "Done" : pending ? "pending" : "Next"}
    </button>
    {done && <div className="text-4xl text-amber-600">Finished</div>}
  </div>;
}
