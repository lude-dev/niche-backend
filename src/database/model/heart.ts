import { model, Schema, Types } from "mongoose"

export const HeartSchema = new Schema({
  place: {
    type: Types.ObjectId,
    ref: 'Place'
  },
  user: {
    type: Types.ObjectId,
    ref: 'User'
  }
})

const heartModel = model('Heart', HeartSchema)

export default heartModel
