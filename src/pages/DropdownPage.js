// DropdownPage.js - Dropdown Demo Page
// Demonstrates two different dropdown implementations

import { useState } from "react";
import Dropdown from "../components/Dropdown"; // Basic dropdown
import CustDropdown from "../components/CustDropdown"; // Custom dropdown

function DropdownPage() {
  // State management for dropdown selections
  // Each dropdown needs its own state variable
  const [colorSelection, setColorSelection] = useState(null);
  const [sizeSelection, setSizeSelection] = useState(null);

  // Event handlers for dropdown changes
  const handleColorSelect = (option) => {
    setColorSelection(option);
    console.log("Selected value:", option.label);
  };

  const handleSizeSelect = (option) => {
    setSizeSelection(option);
    console.log("Selected value:", option.label);
  };

  // Configuration objects for dropdowns
  // This pattern makes dropdowns reusable and configurable
  const colorDropdownConfig = {
    name: "color",
    label: "Choose a color",
    options: [
      { label: "Red", value: "red" },
      { label: "Blue", value: "blue" },
      { label: "Green", value: "green" },
    ],
  };

  const sizeDropdownConfig = {
    name: "size",
    label: "Select size",
    options: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
    ],
  };

  return (
    // Container with flex and grid layout
    <div className="flex inline-grid grid-cols-1 place-items-center space-y-5">
      {/* Basic Dropdown component */}
      <Dropdown
        config={colorDropdownConfig} // Configuration object
        value={colorSelection} // Current selection
        onChange={handleColorSelect} // Change handler
      />

      {/* Custom Dropdown component with enhanced features */}
      <CustDropdown
        config={sizeDropdownConfig} // Configuration object
        value={sizeSelection} // Current selection
        onChange={handleSizeSelect} // Change handler
      />
    </div>
  );
}

export default DropdownPage;

/*
Key React Concepts Demonstrated:

1. State Management:
   - Using useState hook for multiple state variables
   - Separate state for each dropdown

2. Event Handling:
   - Handler functions for dropdown changes
   - Logging selected values

3. Component Configuration:
   - Configuration objects for reusable components
   - Consistent structure for options

4. Component Composition:
   - Using multiple variants of similar components
   - Passing props and handlers

5. Props Pattern:
   - config: Configuration object
   - value: Controlled component state
   - onChange: Event handler callback
*/
