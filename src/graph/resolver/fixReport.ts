import fixReportModel from "../../database/model/fixReport";
import { placeModel } from "../../database/model/place";
import { Context, Location } from "../../types/commonTypes";
import { FixReport, LocationField } from "../../types/schema";
import { TYPE } from '../../database/model/fixReport'
import { nearPlaces } from "./place";
import REPORT_APPROVE_THRESHOLD from "../../constants/reportApproveThreshold";
import { transferWalletBalance } from "../../transaction/transfer";

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

export const approveFixReport = async (parent: unknown, { fixReportId }: {
  fixReportId: string;
}, { user }: Context) => {
  const queriedReport = await fixReportModel.findById(fixReportId)
  if (!queriedReport) throw new Error("알 수 없는 참여 정보에요")
  const threshold = REPORT_APPROVE_THRESHOLD[queriedReport.type]

  if (queriedReport.approved < threshold - 1) {
    queriedReport.set('approved', queriedReport.approved + 1)
    return await queriedReport.save()
  }

  const place = await placeModel.findById(queriedReport.placeId)
  if (!place) throw new Error("위치 정보를 찾을 수 없어요")

  if ([
    'category',
    'name'
  ].includes(queriedReport.type))
    place.set(queriedReport.type, queriedReport.value)

  if (queriedReport.type === 'location')
    place.set('location', queriedReport.newLocation)

  if (queriedReport.type === 'tag') {
    if (!queriedReport.value) throw new Error("변경할 태그 정보가 주어지지 않았습니다");
    place.set('tags', (({
      add: (tags, target) => [...tags, target],
      remove: (tags, target) => {
        const tagIndex = tags.indexOf(target)
        return [...tags.slice(0, tagIndex), ...tags.slice(tagIndex + 1)]
      },
      set: (_, target) => [target]
    }) as Record<
      | "add" | "remove" | "set",
      (tags: string[], target: string) => string[]>)
    [queriedReport.action](place.tags, queriedReport.value))
  }

  await place.save()

  await transferWalletBalance(null, user, 1000, "수정 참여보상")

  return await queriedReport.remove()
}

export const query = {
  nearFixReport: getNearFixReport
}

export const mutation = {
  createFixReport,
  approveFixReport
}

export default {
  place(parent: FixReport) {
    return placeModel.findById(parent.placeId)
  }
}
