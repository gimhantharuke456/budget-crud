import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBudgets, deleteBudget } from "../services/api";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";

const BudgetPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch all budgets
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await getAllBudgets();
        setBudgets(data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };
    fetchBudgets();
  }, []);

  // Handle delete budget
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      try {
        await deleteBudget(id);
        setBudgets(budgets.filter((budget) => budget._id !== id));
        alert("Budget deleted successfully!");
      } catch (error) {
        console.error("Error deleting budget:", error);
        alert("Failed to delete budget.");
      }
    }
  };

  // Handle edit budget
  const handleEdit = (id) => {
    navigate(`/edit-budget/${id}`);
  };

  // Filter budgets based on search query
  const filteredBudgets = budgets.filter((budget) =>
    budget.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate PDF report
  const generateReport = () => {
    const doc = new jsPDF();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `budget-report-${timestamp}.pdf`;

    doc.text("Budget Report", 10, 10);
    autoTable(doc, {
      head: [["Amount", "Category", "Notes", "Start Date", "End Date"]],
      body: filteredBudgets.map((budget) => [
        budget.amount,
        budget.category,
        budget.notes,
        new Date(budget.startDate).toLocaleDateString(),
        new Date(budget.endDate).toLocaleDateString(),
      ]),
      theme: "grid",
      headStyles: { fillColor: [0, 0, 0] }, // Black header
      bodyStyles: { fillColor: [240, 240, 240] }, // Grey body
    });

    doc.save(fileName);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Budget Page</h1>
        <button
          onClick={() => {
            navigate("/create-budget");
          }}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Create Budget
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Generate Report Button */}
      <button
        onClick={generateReport}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Generate Report
      </button>

      {/* Budgets Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Notes</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBudgets.map((budget) => (
              <tr key={budget._id} className="bg-gray-100 hover:bg-gray-200">
                <td className="px-4 py-2 border border-gray-300">
                  ${budget.amount}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {budget.category}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {budget.notes}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(budget.startDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(budget.endDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    onClick={() => handleEdit(budget._id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(budget._id)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetPage;
