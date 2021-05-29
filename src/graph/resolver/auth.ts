import authModel from "../../database/model/auth"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import getEnv from "../../getEnv"
import Env from "../../constants/envKeys"

interface AuthInfo {
  email: string
  password: string
}

const login = (parent: undefined, arg: AuthInfo) => {

}

const register = async (parent: undefined, arg: AuthInfo) => {
  if (await authModel.findOne({
    email: arg.email
  }))
    throw new Error(`이미 존재하는 유저입니다: ${arg.email}`)

  const createdUser = await (new authModel({
    email: arg.email,
    hashedPassword: bcrypt.hashSync(arg.password, 13)
  })).save()

  return {
    email: createdUser.email,
    accessToken: jwt.sign({
      uid: createdUser._id
    }, getEnv(Env.JWT_KEY), {
      expiresIn: '60d'
    })
  }
}

export const mutation = {
  registerUser: register
}
