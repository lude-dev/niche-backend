import { Types } from "mongoose";
import { createSchema, Type } from "ts-mongoose";
import AuthSchema from "./auth";

const UserSchema = createSchema({
  name: Type.string({
    required: true
  }),
  profileImage: Type.string(),
  uid: Type.ref(Type.objectId()).to('Auth', AuthSchema)
})

export default UserSchema
