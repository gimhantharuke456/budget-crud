const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  notes: { type: String, default: "" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model("Budget", budgetSchema);
