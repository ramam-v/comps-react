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
    { label: "Modal", path: "/modal" },
    { label: "Table", path: "/table" },
    { label: "Counter", path: "/counter" },
  ];

  // Map through links array to create navigation items
  const renderedLinks = links.map((link) => {
    return (
      <Link
        key={link.label} // Unique key for React list rendering
        to={link.path} // Navigation path
        className="w-full px-4 py-2.5 text-gray-600 transition-all duration-200 ease-in-out hover:bg-blue-50 hover:text-blue-600 rounded-lg" // Margin between links
        activeClassName="bg-blue-100 text-blue-700 font-medium  border-blue-600" // Styling for active link
      >
        {link.label}
      </Link>
    );
  });

  return (
    // Sidebar container with styling
    <div className="sticky top-0 self-start pt-8 border-r border-gray-400 min-h-screen pr-8">
      <nav className="flex flex-col space-y-2">{renderedLinks}</nav>
    </div>
  );
}

export default Sidebar;
