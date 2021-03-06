import { ApolloServer } from 'apollo-server'
import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
import * as resolvers from './graph/resolver'

config()
import {
  connectDatabase
} from './database/connection'
import typeDefs from './graph/schema'
import getEnv from './getEnv'
import Env from './constants/envKeys'
import userModel from './database/model/user'
import { parse } from 'graphql'
import { getBankWallet } from './transaction/transfer'

connectDatabase().then(() => {
  console.log('Database Connected!')
  getBankWallet()
  const server = new ApolloServer({
    typeDefs,
    context: async ({ req, res }) => {
      const token = (req.headers.authorization)?.split('r ')[1]
      if (!token) return
      const parsed = jwt.decode(token)
      if (typeof parsed !== 'object' || !parsed?.uid) return
      return {
        user: await userModel.findOne({
          uid: parsed.uid
        })
      }
    },
    resolvers: { ...resolvers },
  })

  server.listen(+getEnv(Env.PORT, '6000')).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
})
