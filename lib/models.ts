import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
     category: {
      type: String,
      enum: ['Food', 'Rent', 'Utilities', 'Shopping', 'Entertainment', 'Other'],
      required: true,
    },
  },
  { timestamps: true }
);

export const Transaction =
  mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
