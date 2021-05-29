import Place, * as placeResolver from './place'
import Category, * as categoryResolver from './category'
import Tag, * as tagResolver from './tag'
import * as authResolver from './auth'
import Heart, * as heartResolver from './heart'

export {
  Place,
  Category,
  Tag,
  Heart
}

export const Query = {
  ...placeResolver.query,
  ...categoryResolver.query,
  ...heartResolver.query
}

export const Mutation = {
  ...placeResolver.mutation,
  ...categoryResolver.mutation,
  ...tagResolver.mutation,
  ...authResolver.mutation,
  ...heartResolver.mutation
}
