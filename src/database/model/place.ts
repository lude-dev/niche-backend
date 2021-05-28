import { model, Schema } from "mongoose";
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
      type: [Number],
      required: true
    }
  },
  category: [CategorySchema],
  tags: [TagSchema],
  owner: UserSchema,
  verified: {
    type: Boolean,
    required: true
  }
})

export const placeModel = model('place', PlaceSchema)

// db.place.createIndex({
//   location: '2d'
// })

