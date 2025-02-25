// Table.js - Improved Table Component with JSON Object Support
import React, { useState, useMemo } from "react";
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
 * Table Component
 * @param {Object} props
 * @param {Object} props.data - Contains headers and rows
 * @param {Array<Object>} props.data.headers - Header definitions
 * @param {Array<Object>} props.data.rows - Row data (JSON objects)
 * @param {string} [props.title] - Optional title
 * @param {Object} [props.styles] - Custom styles
 * @param {Function} [props.onRowClick] - Row click handler
 * @returns {React.ReactElement}
 */
function Table({ data, title = "Data Table", styles = {}, onRowClick }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Process headers to ensure a consistent structure
  const processedHeaders = useMemo(() => {
    return data.headers.map((header) => ({
      column: header.column,
      key: header.key, // Key-based access instead of index
      sort: header.sort ?? true, // Default sorting enabled
      render: header.render || ((row) => row[header.key]), // Default renderer
    }));
  }, [data.headers]);

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

  const requestSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return (
      <span className="ml-1">{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
    );
  };

  return (
    <div className={classNames(TABLE_STYLES.container, styles.container)}>
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
                  {column} {getSortIcon(key)}
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
