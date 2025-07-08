// import mongoose from 'mongoose';

// const transactionSchema = new mongoose.Schema(
//   {
//     amount: {
//       type: Number,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//      category: {
//       type: String,
//       enum: ['Food', 'Rent', 'Utilities', 'Shopping', 'Entertainment', 'Other'],
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export const Transaction =
//   mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

import mongoose, { Document, Schema } from 'mongoose';

// Define a TypeScript interface for the transaction data
export interface ITransaction extends Document {
  amount: number;
  description: string;
  date: Date;
  category: 'Food' | 'Rent' | 'Utilities' | 'Shopping' | 'Entertainment' | 'Other';
}

const transactionSchema = new Schema<ITransaction>(
  {
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    category: {
      type: String,
      enum: ['Food', 'Rent', 'Utilities', 'Shopping', 'Entertainment', 'Other'],
      required: true,
    },
  },
  { timestamps: true }
);

// Export both the Mongoose model and the type
export const Transaction =
  mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', transactionSchema);
