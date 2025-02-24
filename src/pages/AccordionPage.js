// AccordionPage.js - Accordion Demo Page
// This page demonstrates the usage of the Accordion component

import Accordion from "../components/Accordion";

function AccordionPage() {
  // Sample data for accordion items
  // Each item has a label (question) and content (answer)
  // This could come from an API or props in a real application
  const items = [
    {
      label: "Q1", // Question or section title
      content: "ABC....", // Expandable content
    },
    {
      label: "Q2",
      content: "BCD....",
    },
    {
      label: "Q3",
      content: "CDE....",
    },
  ];

  return (
    <div>
      {/* 
        Render the Accordion component with items data
        The Accordion component will handle:
        - Expanding/collapsing sections
        - Styling
        - User interactions
      */}
      <Accordion items={items}></Accordion>
    </div>
  );
}

export default AccordionPage;
