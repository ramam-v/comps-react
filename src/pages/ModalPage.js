// ModalPage.js
import { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
/**
 * ModalPage Component
 *
 * STATE MANAGEMENT:
 * - Demonstrates local state management using useState hook
 * - Controls modal visibility state
 * - Shows how to lift state up to parent component
 */
function ModalPage() {
  /**
   * HOOKS PATTERN - useState
   * - useState creates a state variable and setter function
   * - [showModal, setShowModal] uses array destructuring
   * - false is the initial state value
   */
  const [showModal, setShowModal] = useState(false);

  /**
   * EVENT HANDLERS:
   * - Functions defined to handle state changes
   * - Follow the naming convention handle[Event]
   */
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  /**
   * COMPONENT COMPOSITION:
   * - actionBar is defined separately and passed as prop
   * - This pattern allows for better component reusability
   * - Button component receives props: primary and onClick
   */
  const actionBar = (
    <Button primary onClick={handleCloseModal}>
      I Accept
    </Button>
  );

  /**
   * CONDITIONAL RENDERING:
   * - Modal component is defined but only rendered when showModal is true
   * - Uses props to pass data and callbacks to child component
   */
  const modal = (
    <Modal onClose={handleCloseModal} actionBar={actionBar}>
      <p>Here is an important agreement for you to accept</p>
    </Modal>
  );

  /**
   * JSX RENDERING:
   * - Uses conditional rendering with && operator
   * - Shows how to combine multiple components
   * - Demonstrates proper component hierarchy
   */
  return (
    <div className="relative p-10">
      <Button primary className="mb-4" onClick={handleShowModal}>
        Open Modal
      </Button>
      {showModal && modal}
    </div>
  );
}

export default ModalPage;
