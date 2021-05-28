import { model, Schema } from "mongoose"

export const TagSchema = new Schema({
  label: {
    required: true,
    type: String
  }
})

const tagModel = model('tag', TagSchema)

export default tagModel

