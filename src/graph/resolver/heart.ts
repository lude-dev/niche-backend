import heartModel from "../../database/model/heart"
import { placeModel } from "../../database/model/place"
import { Heart, User } from "../../types/schema"

interface newHeartArg {
  place: string
}

const newHeart = async (_: unknown, { place }: newHeartArg, { user }: { user: User }) => {
  const query = {
    place,
    user: user.uid
  }

  const queried = await heartModel.findOne(query)
  if (queried) return queried

  return await (new heartModel(query)).save()
}

export const mutation = {
  newHeart
}

export default {
  place(parent: Omit<Heart, 'place'> & { place: string }) {
    return placeModel.findById(parent.place)
  }
}
