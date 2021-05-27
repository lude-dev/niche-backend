import { ApolloServer } from 'apollo-server'
import { config } from 'dotenv'
import * as resolvers from './graph/resolver'

config()
import './database/connection'
import typeDefs from './graph/schema'

console.log(resolvers)

const server = new ApolloServer({
  typeDefs,
  resolvers: { ...resolvers }
})

console.log(resolvers)

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
