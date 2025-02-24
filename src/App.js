import Sidebar from "./components/Sidebar";
import Route from "./components/Route";
import ButtonPage from "./pages/ButtonPage";
import AccordionPage from "./pages/AccordionPage";
import DropdownPage from "./pages/DropdownPage";

function App() {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <Sidebar />
      <div className="col-span-5">
        <h1 className="place-self-center">React Components</h1>
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

      {/* <div>
        Button Page
        <ButtonPage> </ButtonPage>
        Accordion Page
        <AccordionPage />
        <DropdownPage />
      </div> */}
    </div>
  );
}

export default App;
