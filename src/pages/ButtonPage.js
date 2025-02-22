import Button from "../components/Button";
import { GoBell, GoCode, GoBrowser, GoBug, GoDatabase } from "react-icons/go";

function ButtonPage() {
  return (
    <div>
      <div className="inline-grid grid-cols-1 place-items-center space-y-5">
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

export default ButtonPage;
