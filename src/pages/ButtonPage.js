// ButtonPage.js - Button Demo Page
// Demonstrates different button variants and styles

import Button from "../components/Button";
// Import icons from react-icons library
import { GoBell, GoCode, GoBrowser, GoBug, GoDatabase } from "react-icons/go";

function ButtonPage() {
  return (
    // Container with flex and grid layout for button display
    <div className="flex inline-grid grid-cols-1 place-items-center space-y-5">
      {/* Primary button with outline */}
      <div>
        <Button primary outline className="mb-5">
          <GoBell /> {/* Icon component */}
          Click Me!
        </Button>{" "}
      </div>

      {/* Secondary button with rounded corners */}
      <div>
        <Button secondary rounded>
          <GoCode />
          One
        </Button>{" "}
      </div>

      {/* Success button with outline and rounded corners */}
      <div>
        <Button success outline rounded>
          <GoBrowser />
          Two
        </Button>{" "}
      </div>

      {/* Warning button with rounded corners */}
      <div>
        <Button warning rounded>
          <GoDatabase />
          Three
        </Button>{" "}
      </div>

      {/* Danger button */}
      <div>
        <Button danger>
          <GoBug />
          Four
        </Button>{" "}
      </div>
    </div>
  );
}

export default ButtonPage;

/*
Button Props Demonstrated:
1. Style Variants:
   - primary
   - secondary
   - success
   - warning
   - danger

2. Modifiers:
   - outline: Creates an outlined version
   - rounded: Adds rounded corners

3. Additional Features:
   - Icon integration
   - Custom className support
   - Flexible content through children prop
*/
