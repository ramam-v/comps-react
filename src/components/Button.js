// Button.js - Reusable Button Component
// A flexible button component that supports multiple style variants

import className from "classnames";
import { twMerge } from "tailwind-merge";

function Button({
  // Props destructuring with commonly used button variants
  children, // Special prop for nested content
  primary, // Style variant props
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  ...rest // Rest parameter for additional props
}) {
  // Use utility libraries to compose class names based on props
  // This creates dynamic styling based on the props passed
  const classes = twMerge(
    className(rest.className, "flex items-center px-3 py-1.5 border", {
      // Apply different styles based on button type
      "border-blue-500 bg-blue-500 text-white": primary,
      "border-gray-900 bg-gray-900 text-white": secondary,
      "border-green-500 bg-green-500 text-white": success,
      "border-yellow-400 bg-yellow-400 text-white": warning,
      "border-red-500 bg-red-500 text-white": danger,
      "rounded-full": rounded,
      // Outline variations
      "bg-white": outline,
      "text-blue-500": outline && primary,
      "text-gray-900": outline && secondary,
      "text-green-500": outline && success,
      "text-yellow-400": outline && warning,
      "text-red-500": outline && danger,
    })
  );

  // Render button with composed classes and spread remaining props
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

export default Button;
