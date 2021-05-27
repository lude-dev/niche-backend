import { createSchema, Type, typedModel } from "ts-mongoose";

export const TagSchema = createSchema({
  label: Type.string({
    required: true
  })
})

const tagModel = typedModel('tag', TagSchema)

export default tagModel

