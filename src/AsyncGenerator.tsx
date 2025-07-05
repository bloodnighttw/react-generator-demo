import type { JSX } from "react";
import useAsyncGenerator, { type ReAsyncGenerator } from "./utils/useAsyncGenerator";
import waitTime from "./utils/waitTime";


export async function* AsyncGenerator(): ReAsyncGenerator<JSX.Element> {
  const ms = 1500;

  yield <div className="text-4xl text-amber-300">hi</div>;
  await waitTime({ ms });
  yield <div className="text-4xl text-amber-500">hello</div>;
  await waitTime({ ms });
  yield <div className="text-4xl text-amber-700">world</div>;
  await waitTime({ ms });
  yield <div className="text-4xl text-amber-900">!</div>;
  await waitTime({ ms });
  yield <div className="text-4xl text-amber-400">done</div>;
  await waitTime({ ms });
  return <div className="text-4xl text-amber-600">finished</div>;
}

export function AsyncGeneratorTest() {
  const { content, done, next, pending } = useAsyncGenerator(AsyncGenerator);

  return <div>
    {content}
    <button onClick={() => next()} disabled={done || pending}>
      {done ? "Done" : pending ? "pending" : "Next"}
    </button>
    {done && <div className="text-4xl text-amber-600">Finished</div>}
  </div>;
}
