// Import necessary hooks and icons
import { useState } from "react";
import { GoChevronUp, GoChevronLeft } from "react-icons/go";

function Accordion({ items }) {
  // Initialize state with 0 (first item expanded)
  // expandedIndex keeps track of which accordion item is currently open
  const [expandedIndex, setExpandedIndex] = useState(-1);

  // Map through each item in the items array to create accordion panels
  const renderedItems = items.map((item, index) => {
    // Check if current item is expanded by comparing its index with expandedIndex
    const isExpanded = index === expandedIndex;

    // Click handler function to update which item is expanded
    const handleClick = () => {
      if (expandedIndex === index) {
        setExpandedIndex(-1);
      } else {
        setExpandedIndex(index);
      }
    };

    return (
      // Outer container for each accordion item
      <div
        key={index} // Unique key for React list rendering
        className="mb-3 border-2 border-gray-300 rounded-lg" // Margin bottom, border, and rounded corners
      >
        {/* Header section that user clicks to expand/collapse */}
        <div
          className="flex justify-between p-3 bg-gray-50 cursor-pointer items-center"
          // flex: enables flexbox
          // justify-between: spaces items apart
          // p-3: padding
          // bg-gray-50: light gray background
          // cursor-pointer: shows hand cursor on hover
          // items-center: vertically centers flex items
          onClick={handleClick}
        >
          {/* Label text */}
          <div className="font-semibold">{item.label}</div>

          {/* Icon section - shows up or down arrow based on expanded state */}
          <div>
            {isExpanded ? (
              // Show up arrow if expanded
              <GoChevronUp className="text-xl" />
            ) : (
              // Show down arrow if collapsed
              <GoChevronLeft className="text-xl" />
            )}
          </div>
        </div>

        {/* Content section - only shown if item is expanded */}
        {/* Using && for conditional rendering - if isExpanded is true, show content */}
        {isExpanded && (
          <div className="p-3 border-t border-gray-300">
            {/* p-3: padding
                border-t: top border
                border-gray-300: border color */}
            {item.content}
          </div>
        )}
      </div>
    );
  });

  // Return the complete accordion wrapped in a container
  return <div className="w-full">{renderedItems}</div>;
}

export default Accordion;
