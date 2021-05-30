import Place, * as placeResolver from './place'
import Category, * as categoryResolver from './category'
import Tag, * as tagResolver from './tag'
import * as authResolver from './auth'
import Heart, * as heartResolver from './heart'
import Comment, * as commentResolver from './comment'
import * as fixReportResolver from './fixReport'

export {
  Place,
  Category,
  Tag,
  Heart,
  Comment
}

export const Query = {
  ...placeResolver.query,
  ...categoryResolver.query,
  ...heartResolver.query,
  ...fixReportResolver.query
}

export const Mutation = {
  ...placeResolver.mutation,
  ...categoryResolver.mutation,
  ...tagResolver.mutation,
  ...authResolver.mutation,
  ...heartResolver.mutation,
  ...commentResolver.mutation,
  ...fixReportResolver.mutation
}
