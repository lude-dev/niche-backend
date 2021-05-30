import fixReportModel from "../../database/model/fixReport";
import { placeModel } from "../../database/model/place";
import { Context, Location } from "../../types/commonTypes";
import { FixReport, LocationField } from "../../types/schema";
import { TYPE } from '../../database/model/fixReport'
import { nearPlaces } from "./place";

interface NewFixReport {
  placeId: string
  name?: string
  location?: LocationField
  category?: string
  tag?: {
    action: | 'add' | 'remove'
    tagId: string
  }
}

const createFixReport = async (parent: unknown, arg: NewFixReport, context: Context) => {
  const queriedPlace = await placeModel.findById(arg.placeId)
  if (!queriedPlace) throw new Error("존재하지 않는 장소입니다");

  const commonProperty = {
    placeId: queriedPlace._id,
    user: context.user._id,
    action: 'set'
  }

  const docs = await Promise.all([
    arg.name && ({
      ...commonProperty,
      type: 'name',
      value: arg.name
    }),
    arg.category && ({
      ...commonProperty,
      type: 'category',
      value: arg.category
    }),
    arg.tag && ({
      ...commonProperty,
      action: arg.tag.action,
      value: arg.tag.tagId
    }),
    arg.location && ({
      ...commonProperty,
      newLocation: arg.location
    })
  ].filter(Boolean).map(e => fixReportModel.create(e)))

  return {
    place: queriedPlace,
    properties: docs
  }
}

const getNearFixReport = async (parent: unknown, arg: Location) => {
  const nearPlaceIds = (await nearPlaces(undefined, arg)).map(e => e._id)
  const nearReprots = await fixReportModel.find({
    placeId: {
      $in: nearPlaceIds
    }
  })
  return nearReprots
}

export const query = {
  nearFixReport: getNearFixReport
}

export const mutation = {
  createFixReport
}

export default {
  place(parent: FixReport) {
    return placeModel.findById(parent.placeId)
  }
}
