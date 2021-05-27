import { model } from "mongoose";
import { createSchema, Type, typedModel } from "ts-mongoose";
import { CategorySchema } from "./category";
import { TagSchema } from "./tag";
import UserSchema from "./user";

const PlaceSchema = createSchema({
  name: Type.string({
    required: true
  }),
  location: {
    type: Type.string({
      enum: ["Point"],
      required: true
    }),
    coordinates: Type.array({
      required: true
    }).of(Type.number())
  },
  category: Type.ref(Type.objectId()).to('Category', CategorySchema),
  tags: Type.array().of(Type.ref(Type.objectId()).to('Category', CategorySchema)),
  // tags: Type.array(Type.ref(Type.objectId()).to('Tag', TagSchema)),
  owner: Type.ref(Type.objectId()).to('User', UserSchema),
  verified: Type.boolean({
    required: true
  })
})

export const placeModel = typedModel('place', PlaceSchema)
// export default PlaceSchema
