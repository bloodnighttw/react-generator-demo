import "./App.css";
import { Generator } from "./Generator";
import { AsyncGenerator, AsyncGeneratorTest } from "./AsyncGenerator";
import AsyncGeneratorWalker from "./utils/AsyncGenerator";

function App() {
  return (
    <div className="App">
      <a href="https://github.com/bloodnighttw/react-generator-demo" target="_blank" rel="noopener noreferrer">
      see code{" "}
      </a>
      <h2>click demo title to open code example</h2>
      <a href="https://github.com/bloodnighttw/react-generator-demo/blob/main/src/Generator.tsx" target="_blank">
      <h1 className="text-4xl text-amber-300">React Generator Example</h1>
      </a>{" "}
      <Generator />
      <a href="https://github.com/bloodnighttw/react-generator-demo/blob/main/src/AsyncGenerator.tsx" target="_blank">
      <h1 className="text-4xl text-amber-500">Async Generator Example</h1>
      </a>
      <AsyncGeneratorTest />
      <a href="https://github.com/bloodnighttw/react-generator-demo/blob/main/src/GeneratorWalker.tsx" target="_blank">
      <h1>async walker generator</h1>
      </a>
      <AsyncGeneratorWalker generator={AsyncGenerator} />
    </div>
  );
}

export default App;
