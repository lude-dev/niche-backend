import heartModel from "../../database/model/heart"
import { placeModel } from "../../database/model/place"
import { Context } from "../../types/commonTypes"
import { Heart, User } from "../../types/schema"

interface newHeartArg {
  place: string
}

const newHeart = async (_: unknown, { place }: newHeartArg, { user }: Context) => {
  const query = {
    place,
    user: user.uid
  }

  const queried = await heartModel.findOne(query)
  if (queried) return queried

  return await (new heartModel(query)).save()
}

const removeHeart = async (parent: unknown, { place }: newHeartArg, { user }: Context) => {
  const query = {
    place,
    user: user.uid
  }

  const queried = await heartModel.findOne(query)
  if (queried) return queried

  return await (new heartModel(query)).remove()
}

const myHearts = async (parent: unknown, arg: unknown, { user }: Context) => {
  const queried = await heartModel.find({
    user: user.uid
  })
  console.log(queried)
  return queried
}

export const query = {
  myHearts
}

export const mutation = {
  newHeart,
  removeHeart
}

export default {
  place(parent: Omit<Heart, 'place'> & { place: string }) {
    return placeModel.findById(parent.place)
  }
}
