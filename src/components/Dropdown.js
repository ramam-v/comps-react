import { useState } from "react";

function Dropdown({ config, value, onChange }) {
  const { options, label, name } = config;
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const selectedOption = options.find(
      (option) => option.value === e.target.value
    );
    onChange(selectedOption);
  };

  const renderedOptions = options.map((option, index) => (
    <option key={index} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value?.value || ""}
        onChange={handleChange}
        className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {/* <option value="">Select an option</option> */}
        {renderedOptions}
      </select>
    </div>
  );
}

export default Dropdown;
