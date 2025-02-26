// CTable.js - Table Component with Isolated Rendering
import React, { useMemo, useState, useRef, useEffect } from "react";
import classNames from "classnames";

// Default table styles
const TABLE_STYLES = {
  container: "mb-4",
  title: "text-xl font-semibold mb-2",
  wrapper: "overflow-x-auto",
  table: "min-w-full border-separate border border-gray-300 rounded-lg",
  headerRow: "bg-gray-200",
  headerCell: "border border-gray-400 p-2 font-semibold text-left",
  sortableHeader: "cursor-pointer hover:bg-gray-300 select-none",
  sortIcon: "ml-1 inline-block",
  bodyRow: "bg-white hover:bg-gray-100",
  bodyCell: "border border-gray-300 p-2",
};

/**
 * CTable Component - Table with isolated sorting functionality
 * @param {Object} props
 * @param {Object} props.data - Contains headers and rows
 * @param {Array<Object>} props.data.headers - Header definitions
 * @param {Array<Object>} props.data.rows - Row data (JSON objects)
 * @param {string} [props.title] - Optional title
 * @param {Object} [props.styles] - Custom styles
 * @param {Function} [props.onRowClick] - Row click handler
 * @param {string} [props.id] - Unique identifier for the table
 * @returns {React.ReactElement}
 */
function Table({
  data,
  title = "Data Table",
  styles = {},
  onRowClick,
  id = "table",
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const tableId = useRef(
    id || `table-${Math.random().toString(36).substr(2, 9)}`
  );

  // Process headers to ensure a consistent structure
  const processedHeaders = useMemo(() => {
    return data.headers.map((header) => ({
      column: header.column,
      key: header.key, // Key-based access instead of index
      sort: header.sort ?? false, // Default sorting disabled
      render: header.render || ((row) => row[header.key]), // Default renderer
    }));
  }, [data.headers]);

  // Sort function
  const sortedRows = useMemo(() => {
    // If no sort key is specified, return the original rows without sorting
    if (!sortConfig.key) {
      return data.rows;
    }

    // Create a copy of the rows array to avoid mutating the original data
    let rowsCopy = [...data.rows];

    // Sort the copied array
    rowsCopy.sort((a, b) => {
      // Extract the values to compare from both rows
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      // Handle numeric values
      if (typeof valueA === "number" && typeof valueB === "number") {
        // For ascending order
        if (sortConfig.direction === "asc") {
          return valueA - valueB;
        }
        // For descending order
        else {
          return valueB - valueA;
        }
      }
      // Handle string values (or convert any other types to strings)
      else {
        // For ascending order
        if (sortConfig.direction === "asc") {
          return String(valueA).localeCompare(String(valueB));
        }
        // For descending order
        else {
          return String(valueB).localeCompare(String(valueA));
        }
      }
    });

    return rowsCopy;
  }, [data.rows, sortConfig]);

  // Log only when this specific table instance changes
  useEffect(() => {
    console.log(`Table ${tableId.current} - Headers:`, processedHeaders);
    console.log(`Table ${tableId.current} - Sort config:`, sortConfig);
  }, [processedHeaders, sortConfig]);

  const requestSort = (key) => {
    // Check if we're already sorting by this key
    if (sortConfig.key === key) {
      // If we are already sorting by this key, check the current direction
      if (sortConfig.direction === "asc") {
        // If current direction is ascending, switch to descending
        setSortConfig({
          key: key,
          direction: "desc",
        });
      } else if (sortConfig.direction === "desc") {
        // If current direction is descending, clear sorting to return to original order
        setSortConfig({
          key: null,
          direction: null,
        });
      }
    } else {
      // If we're sorting by a new key, default to ascending direction
      setSortConfig({
        key: key,
        direction: "asc",
      });
    }
  };

  const getSortIcon = (key, sort) => {
    if (sort) {
      // If we're not sorting by this column, or sortConfig.key is null (unsorted state)
      if (sortConfig.key !== key || sortConfig.key === null) {
        // Return a neutral icon or null
        return <span className="ml-1 text-gray-300">▲▼</span>;
      }
      // If we are sorting by this column
      if (sortConfig.direction === "asc") {
        // Ascending sort
        return <span className="ml-1 text-blue-500">▲</span>;
      } else if (sortConfig.direction === "desc") {
        // Descending sort
        return <span className="ml-1 text-blue-500">▼</span>;
      }
    }
    return null;
  };

  return (
    <div
      className={classNames(TABLE_STYLES.container, styles.container)}
      data-table-id={tableId.current}
    >
      {title && (
        <h2 className={classNames(TABLE_STYLES.title, styles.title)}>
          {title}
        </h2>
      )}
      <div className={classNames(TABLE_STYLES.wrapper, styles.wrapper)}>
        <table className={classNames(TABLE_STYLES.table, styles.table)}>
          <thead>
            <tr
              className={classNames(TABLE_STYLES.headerRow, styles.headerRow)}
            >
              {processedHeaders.map(({ column, key, sort }) => (
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
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={classNames(TABLE_STYLES.bodyRow, styles.bodyRow)}
                onClick={
                  onRowClick ? () => onRowClick(row, rowIndex) : undefined
                }
              >
                {processedHeaders.map(({ key, render }) => (
                  <td
                    key={key}
                    className={classNames(
                      TABLE_STYLES.bodyCell,
                      styles.bodyCell
                    )}
                  >
                    {render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
