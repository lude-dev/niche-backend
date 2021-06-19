import { model, Schema, Types } from "mongoose"
import { Heart } from "../../types/schema"

export const HeartSchema = new Schema({
  place: {
    type: Types.ObjectId,
    ref: 'Place'
  },
  user: {
    type: Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

const heartModel = model<Heart>('Heart', HeartSchema)

export default heartModel
