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

connectDatabase().then(() => {
  console.log('Database Connected!')
  const server = new ApolloServer({
    typeDefs,
    resolvers: { ...resolvers },
    async context({ req }) {
      const token = req.headers.authorization?.split('r ')[1]
      if (!token) return
      console.log(jwt.decode(token))
      const parsed = jwt.decode(token)
      if (typeof parsed !== 'object' || !parsed?.uid) return

      return {
        user: await userModel.findOne({
          uid: parsed.uid
        })
      }
    }
  })

  server.listen(+getEnv(Env.PORT, '6000')).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
})
