import { Types } from 'mongoose'
import categoryModel from '../../database/model/category'
import { placeModel } from '../../database/model/place'
import tagModel from '../../database/model/tag'
import { Location } from '../../types/commonTypes'
import { Place } from '../../types/schema'

const getPlace = (...id: unknown[]) => {
  console.log(id)
  return {}
}

const nearPlaces = async (parent: unknown, arg: Location) => {
  return (await placeModel.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [arg.lon, arg.lat]
        },
        $maxDistance: 20
      }
    }
  }))
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
  console.log(await categoryModel.findById(arg.category))
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
    verified: false
  })

  const createdPlace = await newPlace.save()
  return createdPlace
}

export const mutation = {
  createPlace
}

export const query = {
  nearPlaces
}

export default {
  category(arg: Place) {
    return categoryModel.findById(arg.category)
  }
}
