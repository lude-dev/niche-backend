import { model, Schema, Types } from "mongoose";
import { User } from "../../types/schema";

const UserSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  profileImage: String,
  uid: {
    type: Types.ObjectId,
    ref: 'Auth',
    unique: true
  },
  wallet: {
    type: Types.ObjectId,
    ref: 'Wallet',
    unique: true
  }
})

const userModel = model<User>('User', UserSchema)

export default userModel
