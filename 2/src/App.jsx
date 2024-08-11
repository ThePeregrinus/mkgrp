import "./App.css";
import {Converter} from "./components/converter"

function App() {
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center">
      <div className="container">
        <Converter />
      </div>
    </div>
  );
}

export default App;
