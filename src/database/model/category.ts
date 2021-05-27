import { createSchema, Type } from "ts-mongoose";

const CategorySchema = createSchema({
  label: Type.string({
    required: true
  })
})

export default CategorySchema
