import type { JSX } from "react";
import "./App.css";
import useAsyncGeneratorWalker from "./utils/useAsyncGenerator";
import useGenerator, { type ReGenerator } from "./utils/useGenerator";
import waitTime from "./utils/waitTime";

function* generator(): ReGenerator<JSX.Element, number> {
  const i = yield <div className="text-4xl text-amber-300">hi</div>;
  console.log("Generator received:", i);
  yield <div className="text-4xl text-amber-500">hello</div>;
  yield <div className="text-4xl text-amber-700">world</div>;
  yield <div className="text-4xl text-amber-900">!</div>;
  return <div>hi</div>
}

async function* asyncGenerator() {
  const wait = 1500; // 3000ms = 3 seconds

  yield <div className="text-4xl text-amber-300">hi</div>;
  await waitTime(wait);
  yield <div className="text-4xl text-amber-500">hello</div>;
  await waitTime(wait);
  yield <div className="text-4xl text-amber-700">world</div>;
  await waitTime(wait);
  yield <div className="text-4xl text-amber-900">!</div>;
  await waitTime(wait);
  yield <div className="text-4xl text-amber-400">done</div>;
  await waitTime(wait);
  yield <div className="text-4xl text-amber-600">finished</div>;
}

function Generator() {
  const [current, next, done] = useGenerator(generator());

  return (
    <div>
      {current}
      <button onClick={() => next(0)} disabled={done}>
        Next
      </button>
    </div>
  );
}

function AsyncGenerator() {
  const [c] = useAsyncGeneratorWalker(asyncGenerator(), "Loading...");

  return c;
}

function App() {
  return (
    <div className="App">
      <h1 className="text-4xl text-amber-300">React Generator Example</h1>
      <Generator />
      <h1 className="text-4xl text-amber-500">Async Generator Example</h1>
      <AsyncGenerator />
    </div>
  );
}

export default App;
