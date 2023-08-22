import "./App.css";
import { JsonDisplay } from "./components/JsonDisplay";

function App() {
  return (
    <>
      <header>
        <h1>My JSON Interpreter</h1>
      </header>
      <JsonDisplay />
      <footer>By Sam Clark</footer>
    </>
  );
}

export default App;
