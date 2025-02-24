// Route.js - Route Component for Navigation
// Handles conditional rendering based on current URL path

import useNavigation from "../hooks/use-navigation";

function Route({
  path, // The path this route should match
  children, // Content to render when path matches
}) {
  // Use custom navigation hook to get current path
  const { currentPath } = useNavigation();

  // Conditional rendering based on path match
  // Only render children if current path matches this route's path
  if (path === currentPath) {
    return children;
  }

  // Return null (render nothing) if paths don't match
  return null;
}

export default Route;
