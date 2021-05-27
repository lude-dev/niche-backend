import * as placeResolver from './place'
import * as categoryResolver from './category'

export const Query = {
  ...placeResolver.query,
  ...categoryResolver.query
}
export const Mutation = {
  ...placeResolver.mutation,
  ...categoryResolver.mutation
}