import { useState } from "react";
import { GoChevronDown } from "react-icons/go";

function CustDropdown({ config, value, onChange }) {
  const { options, label, name } = config;
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredValue, setHoveredValue] = useState(null);

  const dropdownId = `dropdown-${name}`;
  const listboxId = `listbox-${name}`;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleMouseEnter = (option) => {
    setHoveredValue(option.value);
  };
  const handleMouseLeave = () => {
    setHoveredValue(null);
  };
  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };
  const renderedOptions = options.map((option, index) => (
    <div
      key={index}
      role="option"
      id={`${listboxId}-option-${index}`}
      aria-selected={value?.value === option.value}
      value={option.value}
      className={`cursor-pointer p-2 ${
        hoveredValue === option.value
          ? "bg-blue-200"
          : value?.value === option.value
          ? "bg-green-200"
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
    <div className="mb-4">
      <label
        htmlFor={dropdownId}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div
        className="relative w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer items-center"
        id={dropdownId}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={dropdownId}
        onClick={handleClick}
      >
        <span>{value?.label || label}</span>
        <GoChevronDown className="absolute right-0.5 top-1/2 transform -translate-y-1/2 w-4 text-black-400" />
      </div>
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
