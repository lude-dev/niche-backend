import commentModel from "../../database/model/comment";
import { placeModel } from "../../database/model/place";
import userModel from "../../database/model/user";
import { Context } from "../../types/commonTypes";
import { Comment } from "../../types/schema";

const addComment = async (parent: unknown, arg: Partial<Omit<Comment, '_id'>>, context: Context) => {
  if (!context.user) throw new Error("댓글을 달려면 로그인이 필요합니다")
  const newComment = new commentModel({
    ...arg,
    user: context.user.uid
  })
  return await newComment.save()
}

export const mutation = {
  addComment
}

export default {
  place(parent: Comment) {
    return placeModel.findById(parent.place)
  },
  async user(parent: Comment) {
    console.log(parent.user)
    const fetched = await userModel.findOne({
      uid: parent.user
    })
    console.log(fetched)
    return fetched
  }
}
