import { User } from "./schema";

export interface Location {
  lat: number;
  lon: number;
}

export interface Context {
  user: User
}
