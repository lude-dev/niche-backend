import { createSchema, Type } from "ts-mongoose";
import CategorySchema from "./category";
import TagSchema from "./tag";
import UserSchema from "./user";

const PlaceSchema = createSchema({
  name: Type.string({
    required: true
  }),
  location: Type.object({
    required: true
  }).of({
    lon: Type.number({
      required: true
    }),
    lat: Type.number({
      required: true
    })
  }),
  category: Type.ref(Type.objectId()).to('Category', CategorySchema),
  tags: Type.array(Type.ref(Type.objectId()).to('Tag', TagSchema)),
  owner: Type.ref(Type.objectId()).to('User', UserSchema)
})

export default PlaceSchema
