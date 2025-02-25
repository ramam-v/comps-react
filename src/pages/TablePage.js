import Table from "../components/Table";
import React from "react";

function TablePage() {
  // ========== Table 1: User Information ==========
  const userData = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Pending" },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      status: "Inactive",
    },
  ];

  const userHeaders = [
    { column: "ID", key: "id", sort: true },
    { column: "Name", key: "name", sort: true },
    {
      column: "Email",
      key: "email",
      sort: true,
      render: (row) => (
        <a
          href={`mailto:${row.email}`}
          className="text-blue-600 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {row.email}
        </a>
      ),
    },
    {
      column: "Status",
      key: "status",
      sort: true,
      render: (row) => {
        // Status-based styling
        const statusStyles = {
          Active: "bg-green-200 text-green-800",
          Pending: "bg-yellow-200 text-yellow-800",
          Inactive: "bg-red-200 text-red-800",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              statusStyles[row.status] || ""
            }`}
          >
            {row.status}
          </span>
        );
      },
    },
  ];

  // ========== Table 2: Fruit Colors and Ratings ==========
  const fruitData = [
    { name: "Orange", color: "bg-orange-500", rating: 5 },
    { name: "Apple", color: "bg-red-500", rating: 3 },
    { name: "Banana", color: "bg-yellow-500", rating: 2 },
    { name: "Lime", color: "bg-green-500", rating: 4 },
    { name: "Mango", color: "bg-yellow-300", rating: 1 },
  ];

  const fruitHeaders = [
    { column: "Fruit", key: "name", sort: true },
    {
      column: "Color",
      key: "color",
      sort: false,
      render: (row) => (
        <div
          className={`w-8 h-8 rounded-md ${row.color}`}
          title={row.color}
        ></div>
      ),
    },
    {
      column: "Rating",
      key: "rating",
      sort: true,
      render: (row) => {
        // Render stars based on rating
        const stars = Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={i < row.rating ? "text-yellow-500" : "text-gray-300"}
          >
            ★
          </span>
        ));
        return <div className="flex">{stars}</div>;
      },
    },
  ];

  // ========== Table 3: Search Engine Directory ==========
  // Add action priority property to data for sorting the Actions column
  const searchEngineData = [
    {
      name: "Google",
      color: "bg-blue-500",
      queryLink: "https://google.com/search?q=",
      actionPriority: 1, // Add priority for sorting Actions
    },
    {
      name: "Bing",
      color: "bg-teal-500",
      queryLink: "https://www.bing.com/search?q=",
      actionPriority: 2,
    },
    {
      name: "DuckDuckGo",
      color: "bg-orange-500",
      queryLink: "https://duckduckgo.com/?q=",
      actionPriority: 3,
    },
    {
      name: "Yahoo",
      color: "bg-purple-500",
      queryLink: "https://search.yahoo.com/search?p=",
      actionPriority: 4,
    },
    {
      name: "Ecosia",
      color: "bg-green-500",
      queryLink: "https://www.ecosia.org/search?q=",
      actionPriority: 5,
    },
  ];

  const searchEngineHeaders = [
    { column: "Search Engine", key: "name", sort: true },
    {
      column: "Logo Color",
      key: "color",
      sort: false,
      render: (row) => (
        <div
          className={`w-8 h-8 rounded-md ${row.color}`}
          title={row.color}
        ></div>
      ),
    },
    {
      column: "Query Link",
      key: "queryLink",
      sort: false,
      render: (row) => {
        const displayUrl = row.queryLink
          .replace(/^https?:\/\//, "")
          .substring(0, 30);
        return (
          <a
            href={row.queryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {displayUrl}
          </a>
        );
      },
    },
    {
      column: "Actions",
      key: "actionPriority", // Changed from "name" to "actionPriority" for proper sorting
      sort: true, // Changed from false to true to enable sorting
      render: (row) => {
        // Map search engines to button colors
        const colorMap = {
          Google: "bg-blue-500 hover:bg-blue-700",
          Bing: "bg-teal-500 hover:bg-teal-700",
          DuckDuckGo: "bg-orange-500 hover:bg-orange-700",
          Yahoo: "bg-purple-500 hover:bg-purple-700",
          Ecosia: "bg-green-500 hover:bg-green-700",
        };

        return (
          <button
            className={`${
              colorMap[row.name] || "bg-gray-500 hover:bg-gray-700"
            } text-white font-bold py-1 px-2 rounded`}
            onClick={(e) => {
              e.stopPropagation();
              handleSearch(row);
            }}
          >
            Search
          </button>
        );
      },
    },
  ];

  // Custom styles for each table
  const customStyles1 = {
    headerRow: "bg-blue-300",
    bodyRow: "bg-blue-50 hover:bg-blue-100",
  };

  const customStyles2 = {
    headerRow: "bg-red-300",
    bodyRow: "bg-red-50 hover:bg-red-100",
  };

  const customStyles3 = {
    headerRow: "bg-yellow-200",
    bodyRow: "bg-yellow-50 hover:bg-yellow-100",
  };

  // Row click handlers
  const handleRowClick = (row, rowIndex) => {
    console.log(`Row ${rowIndex} clicked:`, row);
  };

  // Special handler for search engine search
  const handleSearch = (row) => {
    const searchTerm = prompt(`Enter search term for ${row.name}:`);
    if (searchTerm) {
      // Construct the search URL using the query link
      const searchUrl = `${row.queryLink}${encodeURIComponent(searchTerm)}`;
      // Open the search URL in a new tab
      window.open(searchUrl, "_blank");
    }
  };

  // Special handler for search engine row click
  const handleSearchEngineClick = (row) => {
    handleSearch(row);
  };

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Table Examples</h1>

      <div className="bg-white p-4 rounded-lg shadow">
        <Table
          data={{ headers: userHeaders, rows: userData }}
          title="User Information"
          styles={customStyles1}
          onRowClick={handleRowClick}
        />
        <div className="mt-2 text-sm text-gray-600">
          <p>
            This table demonstrates email links and status badges with JSON
            object data.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <Table
          data={{ headers: fruitHeaders, rows: fruitData }}
          title="Fruit Colors and Ratings"
          styles={customStyles2}
          onRowClick={handleRowClick}
        />
        <div className="mt-2 text-sm text-gray-600">
          <p>
            This table demonstrates color swatches and star ratings with JSON
            object data.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <Table
          data={{ headers: searchEngineHeaders, rows: searchEngineData }}
          title="Search Engine Directory"
          styles={customStyles3}
          onRowClick={handleSearchEngineClick}
        />
        <div className="mt-2 text-sm text-gray-600">
          <p>
            Click on any row to search using that search engine, or use the
            search button.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TablePage;
