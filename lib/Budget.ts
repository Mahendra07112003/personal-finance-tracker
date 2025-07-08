// models/Budget.ts

import mongoose, { Schema, model, models } from "mongoose";

const BudgetSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  month: {
    type: String, // Format: 'YYYY-MM'
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Budget = models.Budget || model("Budget", BudgetSchema);
export default Budget;
