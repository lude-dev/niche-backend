import { model, Schema, Types } from "mongoose";
import { Transaction, Wallet } from "../../types/schema";


const transactionSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  reason: String,
  from: {
    type: Types.ObjectId,
    ref: 'Wallet',
    required: true,
  },
  to: {
    type: Types.ObjectId,
    ref: 'Wallet',
    required: true,
  },
})

export const transactionModel = model<Transaction>('Transaction', transactionSchema)
