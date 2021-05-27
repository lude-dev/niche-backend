import { createSchema, Type } from "ts-mongoose";

const TagSchema = createSchema({
  label: Type.string({
    required: true
  })
})

export default TagSchema
