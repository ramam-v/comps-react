// App.js - Main Application Component
// This component serves as the root layout and routing container

import Sidebar from "./components/Sidebar";
import Route from "./components/Route";
import ButtonPage from "./pages/ButtonPage";
import AccordionPage from "./pages/AccordionPage";
import DropdownPage from "./pages/DropdownPage";

function App() {
  return (
    // Using Tailwind CSS grid for responsive layout
    // grid-cols-6 creates a 6-column grid
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      {/* Sidebar takes up 1 column */}
      <Sidebar />

      {/* Main content area spans 5 columns */}
      <div className="col-span-5">
        <h1 className="place-self-center">React Components</h1>

        {/* Route components handle URL-based navigation
            They conditionally render their children based on current URL */}
        <Route path="/accordion">
          <AccordionPage />
        </Route>

        <Route path="/">
          <DropdownPage />
        </Route>

        <Route path="/button">
          <ButtonPage />
        </Route>
      </div>
    </div>
  );
}

export default App;
