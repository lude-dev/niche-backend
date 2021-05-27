import categoryModel from "../../database/model/category"

const allCategory = async (query?: string) => await categoryModel.find(query ? {
  label: {
    $regex: `/${query}/`
  }
} : {})

const createCategory = async (parent: unknown, { label }: {
  label: string
}) => {
  const existCategoryQuery = await categoryModel.findOne({
    label
  })
  if (existCategoryQuery) {
    throw new Error(`이미 존재하는 분류입니다: ${existCategoryQuery._id}`)
  }

  const newCategory = new categoryModel()
  newCategory.set('label', label)

  const savedDocument = await newCategory.save()
  if (!savedDocument._id) throw new Error("문서 생성에 오류가 발생했습니다")

  return savedDocument.toObject()
}

export const query = {
  category: allCategory
}

export const mutation = {
  createCategory
}
