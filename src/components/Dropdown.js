// Dropdown.js - Basic Dropdown Component
// A simpler dropdown implementation using native select element

import { useState } from "react";

function Dropdown({ config, value, onChange }) {
  // Destructure configuration props
  const { options, label, name } = config;

  // State for tracking if dropdown is open (for potential enhancements)
  const [isOpen, setIsOpen] = useState(false);

  // Handler for select element changes
  const handleChange = (e) => {
    // Find the selected option object based on value
    const selectedOption = options.find(
      (option) => option.value === e.target.value
    );
    // Call parent's onChange with the full option object
    onChange(selectedOption);
  };

  // Map options array to option elements
  const renderedOptions = options.map((option, index) => (
    <option key={index} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="mb-4">
      {/* Accessible label */}
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      {/* Native select element with styling */}
      <select
        id={name}
        name={name}
        value={value?.value || ""}
        onChange={handleChange}
        className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {renderedOptions}
      </select>
    </div>
  );
}

export default Dropdown;
