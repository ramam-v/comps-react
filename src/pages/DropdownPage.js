import { useState } from "react";
import Dropdown from "../components/Dropdown";
import CustDropdown from "../components/CustDropdown";

function DropdownPage() {
  const [colorSelection, setColorSelection] = useState(null);
  const [sizeSelection, setSizeSelection] = useState(null);
  const handleColorSelect = (option) => {
    setColorSelection(option);
    console.log("Selected value:", option.label);
  };

  const handleSizeSelect = (option) => {
    setSizeSelection(option);
    console.log("Selected value:", option.label);
  };

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
    <div>
      <h1 className="text-xl font-bold mb-4">Dropdown Page</h1>
      <Dropdown
        config={colorDropdownConfig}
        value={colorSelection}
        onChange={handleColorSelect}
      />
      <CustDropdown
        config={sizeDropdownConfig}
        value={sizeSelection}
        onChange={handleSizeSelect}
      />
    </div>
  );
}

export default DropdownPage;
