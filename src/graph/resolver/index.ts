import Place, * as placeResolver from './place'
import Category, * as categoryResolver from './category'
import Tag, * as tagResolver from './tag'
import * as authResolver from './auth'
import * as heartResolver from './heart'

export {
  Place,
  Category,
  Tag
}

export const Query = {
  ...placeResolver.query,
  ...categoryResolver.query
}

export const Mutation = {
  ...placeResolver.mutation,
  ...categoryResolver.mutation,
  ...tagResolver.mutation,
  ...authResolver.mutation,
  ...heartResolver.mutation
}
