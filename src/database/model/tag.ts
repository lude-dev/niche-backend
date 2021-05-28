import { model, Schema } from "mongoose"
import { Tag } from "../../types/schema"

export const TagSchema = new Schema({
  label: {
    required: true,
    type: String
  }
})

const tagModel = model<Tag>('tag', TagSchema)

export default tagModel

