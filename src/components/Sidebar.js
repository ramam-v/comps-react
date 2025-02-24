// Sidebar.js - Navigation Sidebar Component
// Provides main navigation for the application

import Link from "./Link";

function Sidebar() {
  // Configuration array for navigation links
  // This makes it easy to add or modify navigation options
  const links = [
    { label: "Dropdown", path: "/" },
    { label: "Accordion", path: "/accordion" },
    { label: "Buttons", path: "/button" },
  ];

  // Map through links array to create navigation items
  const renderedLinks = links.map((link) => {
    return (
      <Link
        key={link.label} // Unique key for React list rendering
        to={link.path} // Navigation path
        className="mb-3" // Margin between links
        activeClassName="font-bold border-l-4 border-blue-500 pl-2" // Styling for active link
      >
        {link.label}
      </Link>
    );
  });

  return (
    // Sidebar container with styling
    <div className="sticky top-0 overflow-y-scroll flex flex-col items-start">
      {renderedLinks}
    </div>
  );
}

export default Sidebar;
