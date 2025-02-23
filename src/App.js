import ButtonPage from "./pages/ButtonPage";
import AccordionPage from "./pages/AccordionPage";
import DropdownPage from "./pages/DropdownPage";

function App() {
  return (
    <div className="flex-row  inline-grid  place-items-center">
      <h1>React Components</h1>
      <div>
        Button Page
        <ButtonPage> </ButtonPage>
        Accordion Page
        <AccordionPage />
        <DropdownPage />
      </div>
    </div>
  );
}

export default App;
