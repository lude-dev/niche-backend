import { model, Schema } from "mongoose"
import { Tag } from "../../types/schema"

export const TagSchema = new Schema({
  label: {
    required: true,
    type: String
  }
}, { timestamps: true })

const tagModel = model<Tag>('Tag', TagSchema)

export default tagModel

