import { model, Schema } from "mongoose"

export const CategorySchema = new Schema({
  label: {
    required: true,
    type: String
  }
})

const categoryModel = model('Category', CategorySchema)

export default categoryModel
