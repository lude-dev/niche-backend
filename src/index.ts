import { ApolloServer } from 'apollo-server'
import { config } from 'dotenv'
import * as resolvers from './graph/resolver'

config()
import {
  connectDatabase
} from './database/connection'
import typeDefs from './graph/schema'
import getEnv from './getEnv'
import Env from './constants/envKeys'

connectDatabase().then(() => {
  console.log('Database Connected!')
  const server = new ApolloServer({
    typeDefs,
    resolvers: { ...resolvers },
  })

  server.listen(+getEnv(Env.PORT, '6000')).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
})
