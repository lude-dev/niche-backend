import { model, Schema } from "mongoose"

export const CategorySchema = new Schema({
  label: {
    required: true,
    type: String
  }
})

const categoryModel = model('category', CategorySchema)

export default categoryModel
