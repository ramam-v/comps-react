# Table Component Documentation

## React Hooks in the Table Component

The Table component leverages two essential React hooks that improve both the performance and maintainability of the code:

### 1. useState

```javascript
const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
```

This hook manages the component's sorting state by:
- Tracking which column is currently being sorted (`key`)
- Tracking the direction of the sort (`direction`: "asc" or "desc")
- Providing a setter function (`setSortConfig`) that triggers re-renders when sorting changes

When a user clicks on a sortable column header, the `requestSort` function updates this state, which then flows through the component to re-render with the newly sorted data.

### 2. useMemo

The Table component uses `useMemo` in two critical places:

```javascript
// Process headers to ensure a consistent structure
const processedHeaders = useMemo(() => {
  return data.headers.map((header) => ({
    column: header.column,
    key: header.key,
    sort: header.sort ?? true,
    render: header.render || ((row) => row[header.key]),
  }));
}, [data.headers]);
```

```javascript
// Sort function
const sortedRows = useMemo(() => {
  if (!sortConfig.key) return data.rows;

  return [...data.rows].sort((a, b) => {
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortConfig.direction === "asc"
        ? valueA - valueB
        : valueB - valueA;
    }
    return sortConfig.direction === "asc"
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });
}, [data.rows, sortConfig]);
```

These `useMemo` hooks optimize performance by:
1. Memoizing the processed headers - only recalculating when `data.headers` changes
2. Memoizing the sorted rows - only resorting when `data.rows` or `sortConfig` changes
3. Preventing unnecessary calculations on every render
4. Avoiding expensive operations (like sorting arrays) when the dependencies haven't changed

## Design Advantages of the Table Component

### 1. Separation of Data and Presentation

The Table component cleanly separates data from its presentation:
- Data structure (`headers` and `rows`) is passed as props
- Rendering logic is encapsulated in the component
- Customization is achieved through props rather than modifying the component

This separation makes the component more reusable across different contexts.

### 2. Flexibility through Render Props

```javascript
render: header.render || ((row) => row[header.key])
```

The component uses a render prop pattern that:
- Allows custom rendering of cell content
- Defaults to simple value display when no custom renderer is provided
- Enables complex UI elements within cells (links, badges, buttons, etc.)
- Preserves the table's structure while allowing for visual customization

### 3. Customizable Styling

```javascript
const TABLE_STYLES = {
  container: "mb-4",
  title: "text-xl font-semibold mb-2",
  // ...other default styles
};
```

```javascript
<div className={classNames(TABLE_STYLES.container, styles.container)}>
```

The styling system:
- Provides sensible defaults through `TABLE_STYLES`
- Allows overriding styles through the `styles` prop
- Uses `classNames` to merge default and custom styles
- Maintains consistent structure while allowing visual customization

### 4. Smart Sorting

The table implements intelligent sorting that:
- Detects and sorts numbers and strings appropriately
- Toggles between ascending and descending order
- Provides visual indicators of sort direction
- Can be enabled/disabled per column
- Remembers the current sort configuration

### 5. Event Handling

```javascript
onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
```

The component includes thoughtful event handling:
- Optional row click handlers
- Event propagation management
- Clear UI feedback (hover states, cursor changes)

### 6. Performance Optimization

Performance is a key consideration in the design:
- Memoization prevents unnecessary recalculations
- Conditional rendering avoids creating unused elements
- Efficient data transformations

### 7. Type-Safe Structure

While not using TypeScript explicitly, the component includes JSDoc comments that:
- Document expected prop shapes
- Describe component behavior
- Can be used by TypeScript-aware editors for type hints

## Usage Examples

### Basic Usage
```jsx
<Table
  data={{ 
    headers: [
      { column: "Name", key: "name" },
      { column: "Age", key: "age" }
    ],
    rows: [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 }
    ]
  }}
/>
```

### Custom Rendering
```jsx
<Table
  data={{ 
    headers: [
      { column: "Name", key: "name" },
      { 
        column: "Status", 
        key: "status",
        render: (row) => (
          <span className={`status-${row.status.toLowerCase()}`}>
            {row.status}
          </span>
        )
      }
    ],
    rows: [
      { name: "Server 1", status: "Online" },
      { name: "Server 2", status: "Offline" }
    ]
  }}
/>
```

### Custom Styling
```jsx
<Table
  data={...}
  styles={{
    headerRow: "bg-blue-500 text-white",
    bodyRow: "bg-blue-50 hover:bg-blue-100"
  }}
/>
```

## Implementation Considerations

1. **Accessibility**: The component includes appropriate cursor styling and visual indicators for interactive elements.

2. **Flexibility**: By using render props and customizable styles, the table can adapt to various UI requirements without modification.

3. **Performance**: The use of `useMemo` ensures efficient rendering even with large datasets.

4. **Maintainability**: Clean separation of concerns makes the component easier to understand and extend.

5. **Reusability**: The generic design allows the table to display various types of data in different contexts.
