import Table from "../components/Table";
import React from "react";

function TablePage() {
  // ========== Table 1: Project Information ==========
  const projectData = [
    {
      id: "PRJ-001",
      name: "Website Redesign",
      manager: "Bhuvi",
      status: "In Progress",
      deadline: "2025-03-15",
      budget: 75000,
      priority: "High",
    },
    {
      id: "PRJ-002",
      name: "Mobile App Development",
      manager: "Dhoni",
      status: "Planning",
      deadline: "2025-05-01",
      budget: 120000,
      priority: "Medium",
    },
    {
      id: "PRJ-003",
      name: "Database Migration",
      manager: "Kohli",
      status: "Completed",
      deadline: "2025-02-10",
      budget: 45000,
      priority: "High",
    },
    {
      id: "PRJ-004",
      name: "Security Audit",
      manager: "David Miller",
      status: "On Hold",
      deadline: "2025-04-20",
      budget: 35000,
      priority: "Low",
    },
    {
      id: "PRJ-005",
      name: "Cloud Infrastructure Setup",
      manager: "Suryakumar",
      status: "In Progress",
      deadline: "2025-03-30",
      budget: 90000,
      priority: "Critical",
    },
    {
      id: "PRJ-006",
      name: "User Experience Research",
      manager: "Bhuvi",
      status: "Planning",
      deadline: "2025-04-15",
      budget: 28000,
      priority: "Medium",
    },
    {
      id: "PRJ-007",
      name: "Payment Gateway Integration",
      manager: "Kohli",
      status: "In Progress",
      deadline: "2025-03-25",
      budget: 55000,
      priority: "High",
    },
    {
      id: "PRJ-008",
      name: "Content Management System",
      manager: "Rohit",
      status: "Completed",
      deadline: "2025-02-05",
      budget: 42000,
      priority: "Medium",
    },
  ];

  const projectHeaders = [
    { column: "Project ID", key: "id", sort: true },
    { column: "Project Name", key: "name", sort: true },
    { column: "Project Manager", key: "manager", sort: true },
    {
      column: "Status",
      sort: true,
      key: "status",
      render: (row) => {
        // Status-based styling
        const statusStyles = {
          "In Progress": "bg-blue-200 text-blue-800",
          Planning: "bg-purple-200 text-purple-800",
          Completed: "bg-green-200 text-green-800",
          "On Hold": "bg-yellow-200 text-yellow-800",
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
    {
      column: "Deadline",
      key: "deadline",
      sort: true,
      render: (row) => {
        // Format date for display
        const date = new Date(row.deadline);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
    {
      column: "Budget",
      key: "budget",
      sort: true,
      render: (row) => {
        return `$${row.budget.toLocaleString()}`;
      },
    },
    {
      column: "Priority",
      key: "priority",
      sort: true,
      render: (row) => {
        const priorityStyles = {
          Low: "bg-gray-200 text-gray-800",
          Medium: "bg-blue-200 text-blue-800",
          High: "bg-orange-200 text-orange-800",
          Critical: "bg-red-200 text-red-800",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              priorityStyles[row.priority] || ""
            }`}
          >
            {row.priority}
          </span>
        );
      },
    },
  ];

  // ========== Table 2: Team Member Directory ==========
  const teamData = [
    {
      id: 1,
      name: "David Warner",
      role: "Developer",
      department: "Engineering",
      contact: "david@example.com",
      yearsOfService: 3,
      skillLevel: 4,
      location: "Sydney",
    },
    {
      id: 2,
      name: "Adam Gilchrist",
      role: "Designer",
      department: "Creative",
      contact: "adam@example.com",
      yearsOfService: 5,
      skillLevel: 5,
      location: "Perth",
    },
    {
      id: 3,
      name: "Brett Lee",
      role: "Product Manager",
      department: "Product",
      contact: "brett@example.com",
      yearsOfService: 2,
      skillLevel: 4,
      location: "Melbourne",
    },
    {
      id: 4,
      name: "Shane Warne",
      role: "QA Engineer",
      department: "Engineering",
      contact: "shane@example.com",
      yearsOfService: 1,
      skillLevel: 3,
      location: "Sydney",
    },
    {
      id: 5,
      name: "Ricky Ponting",
      role: "DevOps Engineer",
      department: "Operations",
      contact: "ricky@example.com",
      yearsOfService: 6,
      skillLevel: 5,
      location: "Brisbane",
    },
    {
      id: 6,
      name: "Michael Clarke",
      role: "UI Designer",
      department: "Creative",
      contact: "michael@example.com",
      yearsOfService: 2,
      skillLevel: 3,
      location: "Melbourne",
    },
    {
      id: 7,
      name: "Glenn McGrath",
      role: "Backend Developer",
      department: "Engineering",
      contact: "glenn@example.com",
      yearsOfService: 4,
      skillLevel: 5,
      location: "Sydney",
    },
    {
      id: 8,
      name: "Steve Waugh",
      role: "Project Manager",
      department: "Product",
      contact: "steve@example.com",
      yearsOfService: 7,
      skillLevel: 4,
      location: "Perth",
    },
  ];

  const teamHeaders = [
    { column: "ID", key: "id", sort: true },
    { column: "Name", key: "name", sort: true },
    { column: "Role", key: "role", sort: true },
    { column: "Department", key: "department", sort: true },
    {
      column: "Contact",
      key: "contact",
      sort: true,
      render: (row) => (
        <a
          href={`mailto:${row.contact}`}
          className="text-blue-600 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {row.contact}
        </a>
      ),
    },
    {
      column: "Location",
      key: "location",
      sort: true,
    },
    {
      column: "Experience",
      sort: true,
      key: "yearsOfService",
      render: (row) => {
        // Create a visual indicator of experience
        const years = row.yearsOfService;
        const dots = Array.from({ length: years }, (_, i) => (
          <span
            key={i}
            className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"
          ></span>
        ));

        return (
          <div className="flex items-center">
            <div className="mr-2">{dots}</div>
            <span className="text-sm text-gray-600">
              {years} {years === 1 ? "year" : "years"}
            </span>
          </div>
        );
      },
    },
    {
      column: "Skill Level",
      key: "skillLevel",
      sort: true,
      render: (row) => {
        const level = row.skillLevel;
        const stars = Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`inline-block text-lg ${
              i < level ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ));

        return <div>{stars}</div>;
      },
    },
  ];

  // Custom styles for each table
  const customStyles1 = {
    headerRow: "bg-indigo-300",
    bodyRow: "bg-indigo-50 hover:bg-indigo-100",
    title: "text-indigo-800",
  };

  const customStyles2 = {
    headerRow: "bg-emerald-300",
    bodyRow: "bg-emerald-50 hover:bg-emerald-100",
    title: "text-emerald-800",
  };

  // Row click handlers
  const handleRowClick = (row, rowIndex) => {
    console.log(`Project Row ${rowIndex} clicked:`, row);
  };

  const handleTeamRowClick = (row) => {
    console.log(`Team Member clicked:`, row);
    alert(`Contact ${row.name} at ${row.contact}`);
  };

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Table Examples with Sorting</h1>

      <div className="bg-white p-4 rounded-lg shadow">
        <Table
          id="project-table"
          data={{ headers: projectHeaders, rows: projectData }}
          title="Project Management Dashboard"
          styles={customStyles1}
          onRowClick={handleRowClick}
        />
        <div className="mt-2 text-sm text-gray-600">
          <p>
            This table demonstrates a project management dashboard with status
            indicators. Try sorting by different columns like Project ID,
            Manager, Deadline, or Budget.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <Table
          id="team-table"
          data={{ headers: teamHeaders, rows: teamData }}
          title="Team Member Directory"
          styles={customStyles2}
          onRowClick={handleTeamRowClick}
        />
        <div className="mt-2 text-sm text-gray-600">
          <p>
            This table shows team members with their experience visualized. Test
            the sorting functionality on numeric fields like Years of Service
            and on text fields like Location. Click on any row to see contact
            information.
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Sorting Functionality</h2>
        <p className="mb-2">
          The tables now have full sorting functionality with these features:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Click once on a column header to sort ascending</li>
          <li>Click again on the same column to sort descending</li>
          <li>Click a third time to return to the original order</li>
          <li>Each table has independent sorting state</li>
          <li>Proper handling of both text and numeric values</li>
          <li>Visual indicators show the current sort direction</li>
        </ul>
      </div>
    </div>
  );
}

export default TablePage;
