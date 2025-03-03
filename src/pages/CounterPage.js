import Button from "../components/Button";
import { useReducer } from "react";
import Panel from "../components/Panel";

const INCREMENT_COUNT = "increment-count";
const DECREMENT_COUNT = "decrement-count";
const HANDLE_CHANGE = "handle-change";
const ADD_VALUE_TO_COUNT = "add-value-to-count";
const RESET_VALUETOADD = "reset-valueToAdd";
/**
 * Reducer function for managing state updates
 * @param {Object} state - Current state object
 * @param {Object} action - Action object with type and optional payload
 * @returns {Object} New state
 */
const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      // Increment the count by 1
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT_COUNT:
      // Decrement the count by 1
      return {
        ...state,
        count: state.count - 1,
      };
    case HANDLE_CHANGE:
      // Update valueToAdd when input changes
      return {
        ...state,
        valueToAdd: action.payload,
      };
    case ADD_VALUE_TO_COUNT:
      // Set count to a specific value
      return {
        ...state,
        count: state.count + (parseInt(state.valueToAdd) || 0),
        valueToAdd: "",
      };

    default:
      // Return unchanged state for unknown actions
      return state;
  }
};

/**
 * Counter component with increment, decrement, and custom add functionality
 * @param {Object} props - Component props
 * @param {number} props.initialCount - Initial count value (defaults to 0)
 * @returns {JSX.Element} Rendered component
 */
function CounterPage({ initialCount }) {
  // Initialize state using useReducer hook
  const [state, dispatch] = useReducer(reducer, {
    count: initialCount || 0, // Default to 0 if initialCount is not provided
    valueToAdd: "", // Start with empty input
  });

  /**
   * Handle increment button click
   */
  const handleIncClick = () => {
    dispatch({ type: INCREMENT_COUNT });
  };

  /**
   * Handle decrement button click
   */
  const handleDecClick = () => {
    dispatch({ type: DECREMENT_COUNT });
  };

  /**
   * Handle input field changes
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    dispatch({ type: HANDLE_CHANGE, payload: e.target.value });
  };

  /**
   * Handle form submission to add custom value
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    dispatch({ type: ADD_VALUE_TO_COUNT });
  };

  return (
    <Panel className="m-3">
      {/* Display current count */}
      <h1 className="text-lg">Count is {state.count}</h1>

      {/* Increment and decrement buttons */}
      <div className="flex flex-row">
        <Button onClick={handleIncClick} success>
          Increment
        </Button>

        <Button onClick={handleDecClick} danger>
          Decrement
        </Button>
      </div>

      {/* Form for adding custom value */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="add">Add a lot</label>
        <input
          className="p-1 m-3 bg-gray-50 border border-gray-300"
          type="number"
          id="add"
          value={state.valueToAdd}
          onChange={handleInputChange}
          placeholder="Enter a number"
        />
        <Button type="submit" primary>
          Add It!
        </Button>
      </form>
    </Panel>
  );
}

export default CounterPage;
