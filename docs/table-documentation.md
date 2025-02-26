# Table Component Documentation

## Table of Contents
- [Introduction](#introduction)
- [React Hooks Used in Table](#react-hooks-used-in-table)
- [Independent Table State](#independent-table-state)
- [Event Handling with undefined](#event-handling-with-undefined)
- [Common Table Patterns](#common-table-patterns)
- [Advanced Usage](#advanced-usage)
- [Performance Considerations](#performance-considerations)

## Introduction

The `Table` component is a reusable, feature-rich table implementation for React applications. It supports sortable columns, custom cell rendering, and various styling options while maintaining high performance through optimized rendering.

## React Hooks Used in Table

The component uses several React hooks, each serving a specific purpose:

### useState

```javascript
const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
```

**Purpose**: Manages the sorting state of the table.

**Why it's used**: `useState` is perfect for this case because:
- We need to track which column is being sorted and in which direction
- This state needs to trigger re-renders when it changes
- The state has a simple structure (an object with key and direction)

**Example**: When a user clicks on a sortable column header, we use `setSortConfig` to update which column is being sorted and in which direction:

```javascript
// From a column header click:
setSortConfig({
  key: "name",
  direction: "asc"
});
```

### useMemo

```javascript
const processedHeaders = useMemo(() => {
  return data.headers.map((header) => ({
    column: header.column,
    key: header.key,
    sort: header.sort ?? false,
    render: header.render || ((row) => row[header.key]),
  }));
}, [data.headers]);

const sortedRows = useMemo(() => {
  // Sorting logic...
  return rowsCopy;
}, [data.rows, sortConfig]);
```

**Purpose**: Optimizes expensive computations by caching the results.

**Why it's used**: 
1. For `processedHeaders`:
   - Processing headers involves creating new render functions
   - This only needs to happen when header definitions change
   - Prevents recreating these functions on every render

2. For `sortedRows`:
   - Sorting can be expensive, especially with large datasets
   - Only needs to be recalculated when data changes or sort configuration changes
   - Maintains referential stability for better performance

**Example**: When the table re-renders due to a prop change unrelated to headers, the `processedHeaders` computation is skipped, improving performance.

### useRef

```javascript
const tableId = useRef(id || `table-${Math.random().toString(36).substr(2, 9)}`);
```

**Purpose**: Maintains a stable reference to a value that shouldn't trigger re-renders.

**Why it's used**:
- We need a unique identifier for each table instance
- This ID shouldn't change between renders
- Changes to this value shouldn't cause re-renders

**Example**: The table ID is used for logging and debugging to identify which table instance is responding to interactions, without causing unnecessary renders when it's accessed.

### useEffect

```javascript
useEffect(() => {
  console.log(`Table ${tableId.current} - Headers:`, processedHeaders);
  console.log(`Table ${tableId.current} - Sort config:`, sortConfig);
}, [processedHeaders, sortConfig]);
```

**Purpose**: Runs side effects in response to state changes.

**Why it's used**:
- Allows logging that's tied to specific state changes
- Keeps side effects separate from rendering logic
- Provides clear dependency tracking

**Example**: The component logs changes to headers or sort configuration only when those specific values change, making debugging more focused.

## Independent Table State

Each instance of the `Table` component maintains its own independent state through React's component architecture. Here's how this independence is achieved:

### 1. Component Encapsulation

React creates a new instance of the component with separate state for each place it's used in the DOM. When you include `<Table />` twice in your application, you get two distinct components with isolated state containers.

```jsx
// In TablePage.js
<Table id="project-table" data={projectData} />
<Table id="team-table" data={teamData} />
```

### 2. Unique Identifiers

Each table instance has a unique identifier, either explicitly provided or generated internally:

```javascript
const tableId = useRef(id || `table-${Math.random().toString(36).substr(2, 9)}`);
```

This ensures that:
- Logging is clearly attributed to the specific table instance
- DOM elements can have unique identifiers for styling or selection
- Side effects can be associated with the correct table

### 3. Isolated State Hooks

The `useState` hook creates a separate state container for each component instance:

```javascript
const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
```

When one table's sorting is changed, only that specific table's `sortConfig` state is updated. The other table's `sortConfig` remains unchanged.

### Example of Independent State

1. User clicks to sort the "Project ID" column in the first table:
   ```javascript
   // Inside first Table instance
   setSortConfig({ key: "id", direction: "asc" });
   // Only affects this table instance
   ```

2. The second table's state remains unchanged:
   ```javascript
   // Second Table instance still has
   // sortConfig = { key: null, direction: "asc" }
   ```

This independence ensures that interactions with one table do not affect the rendering or behavior of other tables on the page.

## Event Handling with undefined

In the `Table` component, we use a pattern of conditionally passing `undefined` to event handlers:

```javascript
<th
  onClick={sort ? () => requestSort(key) : undefined}
  title={sort ? "Click to sort" : undefined}
>
```

```javascript
<tr
  onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
>
```

### Why Use undefined Instead of Empty Functions

**1. Performance Benefits**

When you pass `undefined` to an event prop in React, React doesn't attach any DOM event listener at all. This is more efficient than passing an empty function like `() => {}`, which would still create an event listener that does nothing.

```javascript
// This creates NO event listener on the DOM element
<button onClick={undefined}>No listener</button>

// This creates an event listener that does nothing (less efficient)
<button onClick={() => {}}>Empty listener</button>
```

**2. DOM Cleanliness**

For HTML attributes like `title`, passing `undefined` causes React to omit the attribute entirely from the DOM, resulting in cleaner HTML output:

```javascript
// title attribute won't appear in the DOM at all
<div title={undefined}>Clean DOM</div>

// title attribute will be empty string in the DOM
<div title="">Empty title</div>
```

**3. Clear Developer Intent**

Using the conditional pattern with `undefined` clearly communicates to other developers that the event handler is intentionally disabled in certain cases:

```javascript
// Clearly shows intent: only sortable columns have click functionality
onClick={isColumnSortable ? handleSort : undefined}
```

### Real-World Example in the Table Component

In our table implementation, we disable click handlers on non-sortable columns:

```javascript
<th
  key={key}
  className={classNames(
    TABLE_STYLES.headerCell,
    sort && TABLE_STYLES.sortableHeader
  )}
  onClick={sort ? () => requestSort(key) : undefined}
  title={sort ? "Click to sort" : undefined}
>
  {column} {getSortIcon(key, sort)}
</th>
```

This approach gives us several benefits:
1. No event listeners are attached to headers that aren't sortable
2. The "Click to sort" tooltip only appears on sortable columns
3. The code clearly communicates that sorting is conditionally available
4. We get a small performance boost by avoiding unnecessary event listeners

This pattern of using `undefined` to disable event handlers is a React best practice that improves both performance and code clarity.

## Common Table Patterns

### Basic Table with Sortable Columns

```jsx
const headers = [
  { column: "ID", key: "id", sort: true },
  { column: "Name", key: "name", sort: true },
  { column: "Email", key: "email", sort: true }
];

const data = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

<Table 
  data={{ headers, rows: data }}
  title="User Directory"
/>
```

### Table with Custom Cell Rendering

```jsx
const headers = [
  { column: "ID", key: "id", sort: true },
  { column: "Name", key: "name", sort: true },
  { 
    column: "Status", 
    key: "status", 
    sort: true,
    render: (row) => {
      const styles = {
        active: "bg-green-200 text-green-800",
        inactive: "bg-red-200 text-red-800"
      };
      
      return (
        <span className={`px-2 py-1 rounded-full ${styles[row.status]}`}>
          {row.status}
        </span>
      );
    }
  }
];

const data = [
  { id: 1, name: "John Doe", status: "active" },
  { id: 2, name: "Jane Smith", status: "inactive" }
];

<Table data={{ headers, rows: data }} />
```

### Table with Row Actions

```jsx
const handleEdit = (row) => {
  console.log("Edit", row);
};

const handleDelete = (row) => {
  console.log("Delete", row);
};

const headers = [
  { column: "ID", key: "id", sort: true },
  { column: "Name", key: "name", sort: true },
  { 
    column: "Actions", 
    key: "actions",
    sort: false,
    render: (row) => (
      <div className="flex space-x-2">
        <button 
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={(e) => {
            e.stopPropagation();  // Prevent row click
            handleEdit(row);
          }}
        >
          Edit
        </button>
        <button 
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={(e) => {
            e.stopPropagation();  // Prevent row click
            handleDelete(row);
          }}
        >
          Delete
        </button>
      </div>
    )
  }
];

<Table 
  data={{ headers, rows: data }}
  onRowClick={(row) => console.log("Row clicked", row)}
/>
```

### Table with Numeric Formatting

```jsx
const headers = [
  { column: "Product", key: "name", sort: true },
  { 
    column: "Price", 
    key: "price", 
    sort: true,
    render: (row) => `$${row.price.toFixed(2)}`
  },
  { 
    column: "Stock", 
    key: "stock", 
    sort: true,
    render: (row) => row.stock > 0 ? row.stock : "Out of stock"
  }
];

<Table data={{ headers, rows: products }} />
```

### Table with Date Formatting

```jsx
const headers = [
  { column: "Event", key: "name", sort: true },
  { 
    column: "Date", 
    key: "date", 
    sort: true,
    render: (row) => {
      const date = new Date(row.date);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
  }
];

<Table data={{ headers, rows: events }} />
```

## Advanced Usage

### Custom Sorting Logic

You can implement custom sorting logic by modifying the `sortedRows` useMemo function. For example, to add case-insensitive sorting:

```javascript
const sortedRows = useMemo(() => {
  if (!sortConfig.key) return data.rows;
  
  return [...data.rows].sort((a, b) => {
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];
    
    if (typeof valueA === "string" && typeof valueB === "string") {
      // Case-insensitive string comparison
      return sortConfig.direction === "asc"
        ? valueA.toLowerCase().localeCompare(valueB.toLowerCase())
        : valueB.toLowerCase().localeCompare(valueA.toLowerCase());
    }
    
    // Default comparison for other types
    if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });
}, [data.rows, sortConfig]);
```

### Nested Data Sorting

For sorting nested data structures:

```javascript
// For data like: { id: 1, name: "John", details: { department: "Engineering" } }

const sortedRows = useMemo(() => {
  if (!sortConfig.key) return data.rows;
  
  return [...data.rows].sort((a, b) => {
    // Handle nested paths like "details.department"
    const path = sortConfig.key.split(".");
    
    // Get nested value
    const getValue = (obj, path) => {
      return path.reduce((acc, part) => acc && acc[part], obj);
    };
    
    const valueA = getValue(a, path);
    const valueB = getValue(b, path);
    
    // Rest of sorting logic...
  });
}, [data.rows, sortConfig]);
```

### Table with Pagination

To add pagination, you'd need to extend the component with pagination state:

```javascript
function PaginatedTable({ data, itemsPerPage = 10, ...props }) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.rows.slice(startIndex, startIndex + itemsPerPage);
  }, [data.rows, currentPage, itemsPerPage]);
  
  const totalPages = Math.ceil(data.rows.length / itemsPerPage);
  
  return (
    <div>
      <Table data={{ headers: data.headers, rows: paginatedRows }} {...props} />
      
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

## Performance Considerations

### Large Datasets

When working with large datasets (hundreds or thousands of rows), consider:

1. **Virtual Scrolling**: Replace the standard rendering with a virtualized list library like `react-window` or `react-virtualized`.

2. **Server-side Sorting**: Instead of sorting client-side, send sort parameters to your API and let the server handle sorting.

3. **Pagination**: Limit the number of visible rows at once.

### Many Columns with Complex Rendering

For tables with many columns and complex cell rendering:

1. **Memoize Cell Components**: Create separate components for complex cells and memoize them.

2. **Lazy Loading**: Consider loading some columns only when needed.

3. **Column Selection**: Allow users to hide/show columns to reduce rendering work.

### Avoiding Unnecessary Re-renders

1. **Keep `key` Props Stable**: Ensure row keys are stable identifiers, not array indices.

2. **Careful Event Handling**: Use `useCallback` for event handlers passed to table components.

3. **Extract Complex Components**: Move complex UI elements to separate memoized components.

```javascript
// Example of memoized cell component
const StatusCell = memo(({ status }) => {
  const styles = {
    active: "bg-green-200 text-green-800",
    inactive: "bg-red-200 text-red-800"
  };
  
  return (
    <span className={`px-2 py-1 rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
});

// In table header definition
{
  column: "Status",
  key: "status",
  render: (row) => <StatusCell status={row.status} />
}
```

By implementing these patterns and considerations, you can create highly performant, feature-rich tables that handle complex data requirements while maintaining excellent user experience.
