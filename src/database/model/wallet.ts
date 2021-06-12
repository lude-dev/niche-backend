import { model, Schema, Types } from "mongoose";
import { Wallet } from "../../types/schema";

const walletSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  balance: {
    type: Number,
    default: 0
  },
  isBank: Boolean
})

export const walletModel = model<Wallet>('Wallet', walletSchema)
