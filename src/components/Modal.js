// Modal.js
import ReactDOM from "react-dom";
import { useEffect } from "react";

/**
 * Modal Component
 *
 * PROPS PATTERN:
 * - This component demonstrates props pattern where parent components can pass:
 *   - onClose: Function to handle modal closing
 *   - children: Content to be rendered inside modal
 *   - actionBar: Component for modal actions (typically buttons)
 *
 * PORTAL PATTERN:
 * - Uses ReactDOM.createPortal to render modal outside the normal DOM hierarchy
 * - This prevents issues with z-index and styling conflicts
 */
function Modal({ onClose, children, actionBar }) {
  /**
   * HOOKS PATTERN - useEffect
   * - useEffect is used for side effects in functional components
   * - In this case, it manages body scroll behavior when modal opens/closes
   * - The empty dependency array [] means this effect runs only on mount and cleanup
   * - Cleanup function returns body scroll to normal state when component unmounts
   */
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Cleanup function (similar to componentWillUnmount in class components)
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  /**
   * PORTAL RENDERING:
   * - createPortal(what, where) renders content into a different part of the DOM
   * - Useful for modals, tooltips, etc. that need to break out of parent container
   */
  return ReactDOM.createPortal(
    <div>
      {/* 
        EVENT HANDLING:
        - onClick={onClose} demonstrates event prop pattern
        - Clicking overlay triggers onClose function passed from parent
      */}
      <div
        className="fixed inset-0 bg-gray-300 opacity-80"
        onClick={onClose}
      ></div>

      {/* 
        COMPOSITION PATTERN:
        - Uses children prop to render content passed from parent
        - actionBar prop allows customization of modal actions
        - This makes the Modal component highly reusable
      */}
      <div className="fixed inset-40 p-10 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col justify-between h-full">
          {children}
          <div className="flex justify-end">{actionBar}</div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
