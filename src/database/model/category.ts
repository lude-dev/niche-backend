import { createSchema, Type, typedModel } from "ts-mongoose";

export const CategorySchema = createSchema({
  label: Type.string({
    required: true
  })
})

const categoryModel = typedModel('category', CategorySchema)

export default categoryModel
