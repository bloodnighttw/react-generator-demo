import "./App.css";
import { Generator } from "./Generator";
import { AsyncGenerator, AsyncGeneratorTest } from "./AsyncGenerator";
import AsyncGeneratorWalker from "./utils/AsyncGenerator";

function App() {
  return (
    <div className="App">
      <a href="https://github.com/bloodnighttw/react-generator-demo">
        see code{" "}
      </a>
      <a href="https://github.com/bloodnighttw/react-generator-demo/blob/main/src/Generator.tsx">
        <h1 className="text-4xl text-amber-300">React Generator Example</h1>
      </a>{" "}
      <Generator />
      <a href="https://github.com/bloodnighttw/react-generator-demo/blob/main/src/AsyncGenerator.tsx">
        <h1 className="text-4xl text-amber-500">Async Generator Example</h1>
      </a>
      <AsyncGeneratorTest />
      <a href="https://github.com/bloodnighttw/react-generator-demo/blob/main/src/GeneratorWalker.tsx">
        <h1>async walker generator</h1>
      </a>
      <AsyncGeneratorWalker generator={AsyncGenerator} />
    </div>
  );
}

export default App;
