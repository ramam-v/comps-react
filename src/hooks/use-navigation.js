import { useContext } from "react";
import NavigationContext from "../context/navigation";
// Custom Hook
function useNavigation() {
  return useContext(NavigationContext);
}

export default useNavigation;
