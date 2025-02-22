import Accordion from "../components/Accordion";

function AccordionPage() {
  const items = [
    { label: "Q1", content: "ABC...." },
    { label: "Q2", content: "BCD...." },
    { label: "Q3", content: "CDE...." },
  ];
  return (
    <div>
      <Accordion items={items}></Accordion>
    </div>
  );
}

export default AccordionPage;
