import categoryModel from '../../database/model/category'
import { placeModel } from '../../database/model/place'
import tagModel from '../../database/model/tag'
import { Location } from '../../types/commonTypes'

const nearPlaces = (parent: unknown, arg: Location) => {
  console.log(arg)
  return []
}

interface PlaceCreateData {
  name: String
  location: {
    lon: number
    lat: number
  }
  category: String
  tags?: String[]
}

const createPlace = async (parent: unknown, arg: PlaceCreateData) => {
  console.log(arg)
  try {
    if (!await categoryModel.findById(arg.category)) throw null
  } catch (e) {
    throw new Error(`등록되지 않은 분류: "${arg.category}"`)
  }
  if (-180 < arg.location.lat || arg.location.lat > 180) throw new Error(`올바르지 않은 위도: ${arg.location.lat}`)
  if (-180 < arg.location.lon || arg.location.lon > 180) throw new Error(`올바르지 않은 경도: ${arg.location.lon}`)

  if (arg.tags) {
    const invalidTags = arg.tags.filter(tagModel.findById)
    if (invalidTags.length) throw new Error(`등록되지 않은 태그 ID: ${invalidTags.join(', ')}`)
  }

  const newPlace = new placeModel({
    name: arg.name,
    location: arg.location,
    category: arg.category,
    tags: arg.tags,
    verified: false
  })

  const createdPlace = await newPlace.save()
  return createdPlace._id
}

export const mutation = {
  createPlace
}

export const query = {
  nearPlaces
}
