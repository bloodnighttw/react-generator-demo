import type { JSX } from "react";
import useGenerator, { type ReGenerator } from "./utils/useGenerator";

function* generator(): ReGenerator<JSX.Element, number> {
  const i = yield <div className="text-4xl text-amber-300">hi</div>;
  console.log("Generator received:", i);
  yield <div className="text-4xl text-amber-500">hello</div>;
  yield <div className="text-4xl text-amber-700">world</div>;
  yield <div className="text-4xl text-amber-900">!</div>;
  return <div>hi</div>;
}
export function Generator() {
  const { state: current, done, next } = useGenerator(generator);

  return (
    <div>
      {current}
      <button onClick={() => next(0)} disabled={done}>
        {done ? "Done" : "Next"}
      </button>
    </div>
  );
}
