import mongoose from "mongoose";
import Env from "../constants/envKeys";
import getEnv from "../getEnv";

const connection = mongoose.connect(getEnv(Env.DB), {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) console.log("Database Connection Failed", err)
  else console.log("Database Connected!")
})

export const db = mongoose.connection