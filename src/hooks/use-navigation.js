// use-navigation.js - Custom Navigation Hook
// This is a custom hook that provides easy access to navigation context

import { useContext } from "react";
import NavigationContext from "../context/navigation";

// Custom Hook: Encapsulates the logic for accessing navigation context
// Custom hooks must start with 'use' by convention
// This hook makes it easier to use navigation context in any component
function useNavigation() {
  // useContext hook accesses the nearest Context.Provider's value
  // This gives us access to currentPath and navigate function
  return useContext(NavigationContext);
}

export default useNavigation;
