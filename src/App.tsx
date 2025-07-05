import "./App.css";
import { Generator } from "./Generator";
import { AsyncGenerator, AsyncGeneratorTest } from "./AsyncGenerator";
import AsyncGeneratorWalker from "./utils/AsyncGenerator";

function App() {
  return (
    <div className="App">
      <a href="https://github.com/bloodnighttw/react-generator-demo"> see code </a>
      <h1 className="text-4xl text-amber-300">React Generator Example</h1>
      <Generator />
      <h1 className="text-4xl text-amber-500">Async Generator Example</h1>
      <AsyncGeneratorTest />
      <h1>async walker generator</h1>
      <AsyncGeneratorWalker generator={AsyncGenerator} />
    </div>
  );
}

export default App;
