import { Types } from 'mongoose'
import REPORT_APPROVE_THRESHOLD, { PLACE_REGISTER_THRESHOLD } from '../../constants/reportApproveThreshold'
import categoryModel from '../../database/model/category'
import commentModel from '../../database/model/comment'
import heartModel from '../../database/model/heart'
import { placeModel } from '../../database/model/place'
import tagModel from '../../database/model/tag'
import { Context, Location } from '../../types/commonTypes'
import { Place } from '../../types/schema'

export const nearPlaces = async (parent: unknown, arg: Location): Promise<Place[]> => {
  const places = (await placeModel.aggregate([{
    $geoNear: {
      spherical: true,
      maxDistance: 10000,
      near: {
        type: 'Point',
        coordinates: [arg.lon, arg.lat],
      },
      distanceField: 'distance',
      key: 'location'
    }
  }, {
    $project: {
      verifiedCount: {
        $size: "$verifier"
      },
      name: true,
      location: true,
      category: true,
      tags: true,
      owner: true,
      verifier: true
    }
  },
    // {
    //   $match: {
    //     verifiedCount: {
    //       $gte: PLACE_REGISTER_THRESHOLD
    //     }
    //   }
    // }
  ]))
  console.log(places)
  return places
}

export const unverifiedNearPlaces = async (parent: unknown, arg: Location): Promise<Place[]> => {
  const places = (await placeModel.aggregate([{
    $geoNear: {
      spherical: true,
      maxDistance: 10000,
      near: {
        type: 'Point',
        coordinates: [arg.lon, arg.lat],
      },
      distanceField: 'distance',
      key: 'location'
    }
  }, {
    $project: {
      verifiedCount: {
        $size: "$verifier"
      },
      name: true,
      location: true,
      category: true,
      tags: true,
      owner: true,
      verifier: true
    }
  },
  {
    $match: {
      verifiedCount: {
        $lte: PLACE_REGISTER_THRESHOLD
      }
    }
  }
  ]))
  return places
}

export const queryPlaces = async (parent: unknown, { query }: { query?: string }) => {
  return await placeModel.find(query ? {
    name: {
      $regex: query,
      $options: 'i'
    }
  } : {})
}

interface PlaceCreateData {
  name: string
  location: {
    lon: number
    lat: number
  }
  category: string
  tags?: string[]
}

const createPlace = async (parent: unknown, arg: PlaceCreateData) => {
  try {
    if (!await categoryModel.findById(arg.category)) throw null
  } catch (e) {
    throw new Error(`등록되지 않은 분류: "${arg.category}"`)
  }
  if (arg.location.lat < -180 || arg.location.lat > 180) throw new Error(`올바르지 않은 위도: ${arg.location.lat}`)
  if (arg.location.lon < -180 || arg.location.lon > 180) throw new Error(`올바르지 않은 경도: ${arg.location.lon}`)

  if (arg.tags) {
    const invalidTags = arg.tags.filter(tagModel.findById)
    if (invalidTags.length) throw new Error(`등록되지 않은 태그 ID: ${invalidTags.join(', ')}`)
  }

  const newPlace = new placeModel({
    name: arg.name,
    location: {
      type: "Point",
      coordinates: [arg.location.lon, arg.location.lat]
    },
    category: arg.category,
    tags: arg.tags,
    verifier: []
  })

  const createdPlace = await newPlace.save()
  return createdPlace
}

const verifyPlace = async (parent: unknown, { placeId }: { placeId: string }, context: Context) => {
  if (!context.user)
    throw new Error("로그인이 필요합니다")
  const place = await placeModel.findById(placeId)
  if (!place) throw new Error("존재하지 않는 가게입니다")

  const newArr = ([...place.verifier, context.user.uid])
  const uniqueArr = newArr.filter((item, index) => newArr.indexOf(item) !== index)
  place.set('verifier', uniqueArr)
  return await place.save()
}

export const mutation = {
  createPlace,
  verifyPlace
}

export const query = {
  nearPlaces,
  queryPlaces,
  unverifiedNearPlaces,
  async place(parent: unknown, { placeId }: { placeId: string }) {
    const queriedPlace = await placeModel.findById(placeId)
    console.log(queriedPlace)
    if (!queriedPlace) throw new Error("존재하지 않는 가게입니다")
    return queriedPlace
  }
}

export default {
  category(arg: Place) {
    return categoryModel.findById(arg.category)
  },
  comment(parent: Place) {
    return commentModel.find({
      place: parent._id
    })
  },
  hearted(parent: Place, arg: unknown, context: Context) {
    return !!heartModel.findOne({
      user: context.user.uid,
      place: parent._id
    })
  },
  location(parent: Place) {
    return {
      lon: parent.location.coordinates[0],
      lat: parent.location.coordinates[1],
    }
  },
  verified(parent: Place) {
    return parent.verifier.length > PLACE_REGISTER_THRESHOLD
  },
  heartQuantity(parent: Place) {
    return heartModel.count({
      place: parent._id
    })
  },
  commentQuantity(parent: Place) {
    return commentModel.count({
      place: parent._id
    })
  }
}
