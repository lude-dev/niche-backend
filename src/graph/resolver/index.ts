import Place, * as placeResolver from './place'
import Category, * as categoryResolver from './category'
import Tag, * as tagResolver from './tag'
import * as authResolver from './auth'
import Heart, * as heartResolver from './heart'
import Comment, * as commentResolver from './comment'
import FixReport, * as fixReportResolver from './fixReport'
import User, * as UserResolver from './user'

export {
  Place,
  Category,
  Tag,
  Heart,
  Comment,
  FixReport,
  User
}

export const Query = {
  ...placeResolver.query,
  ...categoryResolver.query,
  ...heartResolver.query,
  ...fixReportResolver.query,
  ...tagResolver.query,
  ...UserResolver.query
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
