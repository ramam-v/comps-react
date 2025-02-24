// Accordion.js - Expandable Accordion Component
// This component creates an expandable/collapsible accordion interface

import { useState } from "react";
import { GoChevronUp, GoChevronLeft } from "react-icons/go";

function Accordion({ items }) {
  // State to track which section is expanded
  // -1 means no section is expanded
  const [expandedIndex, setExpandedIndex] = useState(-1);

  // Map through items array to create accordion sections
  const renderedItems = items.map((item, index) => {
    // Check if this item is the expanded one
    const isExpanded = index === expandedIndex;

    // Handler to toggle expansion state
    const handleClick = () => {
      // If this section is already expanded, collapse it
      // Otherwise, expand this section
      setExpandedIndex(isExpanded ? -1 : index);
    };

    return (
      <div key={index} className="mb-3 border-2 border-gray-300 rounded-lg">
        {/* Header section with click handler */}
        <div
          className="flex justify-between p-3 bg-gray-50 cursor-pointer items-center"
          onClick={handleClick}
        >
          <div className="font-semibold">{item.label}</div>

          {/* Conditional rendering for expand/collapse icons */}
          <div>
            {isExpanded ? (
              <GoChevronUp className="text-xl" />
            ) : (
              <GoChevronLeft className="text-xl" />
            )}
          </div>
        </div>

        {/* Content section - only shown when expanded */}
        {isExpanded && (
          <div className="p-3 border-t border-gray-300">{item.content}</div>
        )}
      </div>
    );
  });

  return <div className="w-full">{renderedItems}</div>;
}

export default Accordion;
