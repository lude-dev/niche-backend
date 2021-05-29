import authModel from "../../database/model/auth"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import getEnv from "../../getEnv"
import Env from "../../constants/envKeys"
import userModel from "../../database/model/user"

interface AuthInfo {
  email: string
  password: string
  name: string
  profileImage?: string
}

const signUid = (uid: string) => jwt.sign({
  uid
}, getEnv(Env.JWT_KEY), {
  expiresIn: '60d'
})

const login = async (parent: undefined, arg: AuthInfo) => {
  const queriedUser = await authModel.findOne({
    email: arg.email
  })

  if (!queriedUser || !bcrypt.compareSync(arg.password, queriedUser.hashedPassword))
    throw new Error(`일치하는 로그인 정보를 찾을 수 없습니다`)

  return {
    accessToken: signUid(queriedUser._id)
  }
}

const register = async (parent: undefined, arg: AuthInfo) => {
  if (await authModel.findOne({
    email: arg.email
  }))
    throw new Error(`중복된 이메일이 존재합니다: ${arg.email}`)

  const createdAuthInfo = await (new authModel({
    email: arg.email,
    hashedPassword: bcrypt.hashSync(arg.password, 13)
  })).save()

  await (new userModel({
    name: arg.name,
    profileImage: arg.profileImage,
    uid: createdAuthInfo._id
  })).save()

  return {
    email: createdAuthInfo.email,
    accessToken: signUid(createdAuthInfo.email)
  }
}

export const mutation = {
  registerUser: register,
  login
}
