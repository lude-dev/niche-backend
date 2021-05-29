import commentModel from "../../database/model/comment";
import { placeModel } from "../../database/model/place";
import { Comment } from "../../types/schema";

const addComment = async (parent: unknown, arg: Partial<Omit<Comment, '_id'>>) => {
  const newComment = new commentModel(arg)
  return await newComment.save()
}

export const mutation = {
  addComment
}

export default {
  place(parent: Comment) {
    return placeModel.findById(parent.place)
  }
}
