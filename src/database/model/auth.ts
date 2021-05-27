import { createSchema, Type } from "ts-mongoose";

const AuthSchema = createSchema({
  username: Type.string({
    required: true
  }),
  hashedPassword: Type.string({
    required: true
  })
})

export default AuthSchema
