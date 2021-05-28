import mongoose from "mongoose";
import Env from "../constants/envKeys";
import getEnv from "../getEnv";

export const connectDatabase = () =>
  mongoose.connect(getEnv(Env.DB), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).catch(err => console.log("Database Connection Failed", err))

export const db = mongoose.connection