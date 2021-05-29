import { model, Schema, Types } from "mongoose";
import { User } from "../../types/schema";
import { AuthSchema } from "./auth";

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
  }
})

const userModel = model<User>('User', UserSchema)

export default userModel
