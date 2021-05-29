import { model, Schema, Types } from "mongoose";

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  photo: [{
    type: String,
    required: false
  }],
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  place: {
    type: Types.ObjectId,
    ref: 'Place'
  }
})

const commentModel = model<Comment>('Comment', commentSchema)
export default commentModel
