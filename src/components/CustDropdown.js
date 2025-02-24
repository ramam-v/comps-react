// CustDropdown.js - Custom Dropdown Component
// A custom dropdown implementation with hover states and keyboard navigation

import { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import Panel from "./Panel";

function CustDropdown({ config, value, onChange }) {
  // Destructure configuration props for easier access
  const { options, label, name } = config;

  // Multiple state hooks for managing dropdown behavior
  const [isOpen, setIsOpen] = useState(false); // Controls dropdown open/closed state
  const [hoveredValue, setHoveredValue] = useState(null); // Tracks currently hovered option

  // useRef hook creates a mutable reference for the dropdown element
  // This is used for detecting clicks outside the dropdown
  const divEl = useRef();

  // Generate unique IDs for accessibility
  const dropdownId = `dropdown-${name}`;
  const listboxId = `listbox-${name}`;

  // Effect hook for handling clicks outside the dropdown
  useEffect(() => {
    const handler = (event) => {
      // If click is outside dropdown, close it
      if (!divEl.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener in capture phase (true parameter)
    document.addEventListener("click", handler, true);

    // Cleanup function removes event listener
    // This prevents memory leaks and ensures proper cleanup
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Event handlers for dropdown interactions
  const handleClick = () => {
    setIsOpen(!isOpen); // Toggle dropdown
  };

  const handleMouseEnter = (option) => {
    setHoveredValue(option.value); // Track hovered option
  };

  const handleMouseLeave = () => {
    setHoveredValue(null); // Clear hover state
  };

  const handleOptionClick = (option) => {
    onChange(option); // Update selected value
    setIsOpen(false); // Close dropdown
  };

  // Render dropdown options with proper accessibility attributes
  const renderedOptions = options.map((option, index) => (
    <div
      key={index}
      role="option"
      id={`${listboxId}-option-${index}`}
      aria-selected={value?.value === option.value}
      value={option.value}
      className={`cursor-pointer p-2 ${
        // Dynamic classes based on hover and selection state
        hoveredValue === option.value
          ? "bg-blue-200" // Hover state
          : value?.value === option.value
          ? "bg-green-200" // Selected state
          : ""
      }`}
      onClick={() => handleOptionClick(option)}
      onMouseEnter={() => handleMouseEnter(option)}
      onMouseLeave={handleMouseLeave}
    >
      {option.label}
    </div>
  ));

  return (
    <div ref={divEl} className="mb-4">
      {/* Accessible label */}
      <label
        htmlFor={dropdownId}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      {/* Dropdown trigger button */}
      <Panel
        className="relative px-3 py-2 text-gray-700 border-gray-300 shadow-sm cursor-pointer items-center"
        id={dropdownId}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={dropdownId}
        onClick={handleClick}
      >
        <span>{value?.label || label}</span>
        <GoChevronDown className="absolute right-0.5 top-1/2 transform -translate-y-1/2 w-4 text-black-400" />
      </Panel>

      {/* Dropdown options list - only shown when isOpen is true */}
      {isOpen && (
        <div
          role="listbox"
          className="mt-1 border border-gray-300 rounded-md shadow-sm"
        >
          {renderedOptions}
        </div>
      )}
    </div>
  );
}

export default CustDropdown;
