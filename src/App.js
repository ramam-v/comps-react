import ButtonPage from "./pages/ButtonPage";
import AccordionPage from "./pages/AccordionPage";

function App() {
  return (
    <div className="flex-row  inline-grid  place-items-center">
      <h1>React Components</h1>
      <div>
        Button Page
        <ButtonPage> </ButtonPage>
        Accordion Page
        <AccordionPage />
      </div>
    </div>
  );
}

export default App;
