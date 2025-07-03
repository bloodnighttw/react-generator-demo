import "./App.css";
import useAsyncGeneratorWalker from "./utils/useAsyncGenerator";
import useGenerator from "./utils/useGenerator";
import waitTime from "./utils/waitTime";

function* generator() {
  while (true) {
    yield <div className="text-4xl text-amber-300">hi</div>;
    yield <div className="text-4xl text-amber-500">hello</div>;
    yield <div className="text-4xl text-amber-700">world</div>;
    yield <div className="text-4xl text-amber-900">!</div>;
  }
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
      <button onClick={() => next()} disabled={done}>
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
