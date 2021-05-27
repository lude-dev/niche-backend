import Env from "./constants/envKeys"

const getEnv = (key: Env, defaultValue?: string): string => {
  const value = process.env[key]
  if (value) return value
  if (defaultValue) return defaultValue
  throw new Error(`key "${key}" not found on env`)
}

export default getEnv
