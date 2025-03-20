import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/budgets";

// Create a new budget
export const createBudget = async (budgetData) => {
  try {
    const response = await axios.post(API_BASE_URL, budgetData);
    return response.data;
  } catch (error) {
    console.error("Error creating budget:", error);
    throw error;
  }
};

// Get all budgets
export const getAllBudgets = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching budgets:", error);
    throw error;
  }
};

// Get a budget by ID
export const getBudgetById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching budget:", error);
    throw error;
  }
};

// Update a budget by ID
export const updateBudget = async (id, updateData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating budget:", error);
    throw error;
  }
};

// Delete a budget by ID
export const deleteBudget = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting budget:", error);
    throw error;
  }
};
