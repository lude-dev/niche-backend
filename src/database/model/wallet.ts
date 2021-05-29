import { model, Schema, Types } from "mongoose";

const walletSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  balance: {
    type: Number,
    default: 0
  }
})

export const walletModel = model('Wallet', walletSchema)
