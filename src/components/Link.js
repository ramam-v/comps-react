// Link.js - Custom Link Component
// Implements client-side navigation while preserving browser behavior

import classNames from "classnames";
import useNavigation from "../hooks/use-navigation";

function Link({
  to, // Target path
  children, // Link content
  className, // Additional CSS classes
  activeClassName, // Classes to apply when link is active
}) {
  // Use custom navigation hook to access navigation context
  const { navigate, currentPath } = useNavigation();

  // Compose classes including active state
  // classNames utility helps manage conditional classes
  const classes = classNames(
    "block text-base select-none cursor-pointer",
    className,
    // Apply activeClassName if this link matches current path
    currentPath === to && activeClassName
  );

  // Handle click events with special cases
  const handleClick = (e) => {
    // Allow ctrl/cmd + click to open in new tab
    if (e.metaKey || e.ctrlKey) {
      return;
    }

    // Prevent default browser navigation
    e.preventDefault();

    // Use custom navigation
    navigate(to);
  };

  return (
    <a
      href={to} // Regular href for SEO and accessibility
      onClick={handleClick} // Custom click handler
      className={classes} // Combined classes
    >
      {children}
    </a>
  );
}

export default Link;
