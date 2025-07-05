import "./App.css";
import { Generator } from "./Generator";
import { AsyncGenerator } from "./AsyncGenerator";

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
