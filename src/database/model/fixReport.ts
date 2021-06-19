import { model, Schema, Types } from "mongoose";
import { FixReport } from "../../types/schema";

export const TYPE = ["name", "location", "category", "tags"] as const

const fixReportSchema = new Schema({
  placeId: {
    type: Types.ObjectId,
    ref: 'Place',
    required: true
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: TYPE,
    required: true
  },
  action: {
    type: String,
    enum: ["add", "remove", "set"],
    required: true
  },
  value: String,
  newLocation: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: { type: '2dsphere', sparse: false },
    },
  },
  approved: {
    type: Number,
    default: 0,
    required: true
  }
}, { timestamps: true })

const fixReportModel = model<FixReport>('FixReport', fixReportSchema)
export default fixReportModel
