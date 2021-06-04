import { placeModel } from "../../database/model/place"
import tagModel from "../../database/model/tag"
import { Tag } from "../../types/schema"

const getAllTags = () => tagModel.find({})

const searchTag = (parent: unknown, { query }: { query: string }) => {
  console.log(query)
  return tagModel.find({
    label: {
      $regex: query,
      $options: 'i'
    }
  })
}

const createTag = async (parent: unknown, { label }: {
  label: string
}) => {
  const isExist = await tagModel.findOne({
    label: label
  })
  if (isExist)
    throw new Error(`이미 존재하는 태그입니다: ${isExist._id}`)

  return await (new tagModel({
    label
  })).save()
}

export const query = {
  tags: getAllTags,
  searchTag
}

export const mutation = {
  createTag
}

export default {
  place(arg: Tag) {
    console.log(arg._id)
    return placeModel.find({
      tags: arg._id
    })
  }
}
