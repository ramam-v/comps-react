// navigation.js - Navigation Context Implementation
// This file implements a custom navigation system using React Context

import { createContext, useState, useEffect } from "react";

// Create a Context object for navigation
// Context lets us pass data through the component tree without props
const NavigationContext = createContext();

function NavigationProvider({ children }) {
  // State hook to track the current URL path
  // This state will be shared with all components that use this context
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Effect hook to handle browser navigation (back/forward buttons)
  useEffect(() => {
    const handler = () => {
      setCurrentPath(window.location.pathname);
    };

    // Add event listener for browser navigation
    window.addEventListener("popstate", handler);

    // Cleanup function to prevent memory leaks
    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, []); // Empty array means this effect runs only once on mount

  // Custom navigation function to update URL and state
  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setCurrentPath(to);
  };

  // Provider component makes navigation context available to child components
  return (
    <NavigationContext.Provider value={{ currentPath, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export default NavigationContext;
export { NavigationProvider };
