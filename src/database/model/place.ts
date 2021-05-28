import { model, Schema, Types } from "mongoose";
import { db } from "../connection";
import { CategorySchema } from "./category";
import { TagSchema } from "./tag";
import UserSchema from "./user";

const PlaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // <lng, lat>
      index: { type: '2dsphere', sparse: false },
      required: true,
    },
  },
  category: [{
    type: Types.ObjectId,
    ref: 'category'
  }],
  tags: [{
    type: Types.ObjectId,
    ref: 'Tag'
  }],
  owner: {
    type: Types.ObjectId,
    ref: 'User'
  },
  verified: {
    type: Boolean,
    required: true
  }
})

export const placeModel = model('place', PlaceSchema)
