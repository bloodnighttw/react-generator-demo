import useAsyncGenerator from "./utils/useAsyncGenerator";
import waitTime from "./utils/waitTime";


async function* asyncGenerator() {
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
export function AsyncGenerator() {
  const { content, done, next, pending } = useAsyncGenerator(asyncGenerator);

  return <div>
    {content}
    <button onClick={() => next(undefined)} disabled={done || pending}>
      {done ? "Done" : pending ? "pending" : "Next"}
    </button>
    {done && <div className="text-4xl text-amber-600">Finished</div>}
  </div>;
}
