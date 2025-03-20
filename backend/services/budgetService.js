const Budget = require("../models/Budget");

// Create a new budget
const createBudget = async (budgetData) => {
  const budget = new Budget(budgetData);
  return await budget.save();
};

// Get all budgets
const getAllBudgets = async () => {
  return await Budget.find();
};

// Get a budget by ID
const getBudgetById = async (id) => {
  return await Budget.findById(id);
};

// Update a budget by ID
const updateBudget = async (id, updateData) => {
  return await Budget.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a budget by ID
const deleteBudget = async (id) => {
  return await Budget.findByIdAndDelete(id);
};

module.exports = {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};
