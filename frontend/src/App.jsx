import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BudgetPage from "./pages/BudgetPage";
import CreateBudget from "./pages/CreateBudget";
import UpdateBudget from "./pages/UpdateBudget";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BudgetPage />} path="/" />
        <Route element={<CreateBudget />} path="/create-budget" />
        <Route element={<UpdateBudget />} path="/edit-budget/:id" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
