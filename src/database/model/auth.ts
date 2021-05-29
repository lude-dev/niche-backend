import { model, Schema } from "mongoose"
import { Auth } from "../../types/schema"

export const AuthSchema = new Schema({
  email: {
    required: true,
    type: String
  },
  hashedPassword: {
    required: true,
    type: String
  }
})

const authModel = model<Auth>('Auth', AuthSchema)
export default authModel
