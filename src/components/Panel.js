// Panel.js - Reusable Panel Component
// A basic container component with consistent styling

import classNames from "classnames";

function Panel({
  children, // Content to be rendered inside panel
  className, // Additional CSS classes
  ...rest // Rest operator to collect additional props
}) {
  // Combine default classes with any additional classes
  // Using classNames utility for class composition
  const finalClassNames = classNames(
    // Default panel styling
    "border rounded p-3 shadow bg-white w-full",
    // Additional classes passed as props
    className
  );

  return (
    // Spread additional props and use combined classes
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}

export default Panel;
