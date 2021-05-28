import { Schema } from "mongoose"

const AuthSchema = new Schema({
  username: {
    required: true,
    type: String
  },
  hashedPassword: {
    required: true,
    type: Boolean
  }
})

export default AuthSchema
