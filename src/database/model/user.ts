import { Schema, Types } from "mongoose";
import AuthSchema from "./auth";

const UserSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  profileImage: String,
  uid: AuthSchema
})

export default UserSchema
