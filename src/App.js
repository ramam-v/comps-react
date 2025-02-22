import Button from "./components/Button";
import { GoBell, GoCode, GoBrowser, GoBug, GoDatabase } from "react-icons/go";

function App() {
  return (
    <div>
      <h1>React Components</h1>
      <div className="grid grid-cols-1 divide-y-4 divide-yellow-200">
        <div>
          <Button primary outline className="mb-5">
            <GoBell />
            Click Me!
          </Button>{" "}
        </div>
        <div>
          <Button secondary rounded>
            <GoCode />
            One
          </Button>{" "}
        </div>
        <div>
          <Button success outline rounded>
            <GoBrowser />
            Two
          </Button>{" "}
        </div>
        <div>
          <Button warning rounded>
            <GoDatabase />
            Three
          </Button>{" "}
        </div>
        <div>
          <Button danger>
            <GoBug />
            Four
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}

export default App;
