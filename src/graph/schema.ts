import { gql } from "apollo-server-core"

const typeDefs = gql`
  type Location {
    lat: Float
    lon: Float
  }

  type Category {
    _id: ID!
    label: String
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    profileImage: String!
  }

  type Tag {
    _id: ID!
    label: String!
  }

  type Place {
    _id: ID!
    name: String!
    location: Location!
    category: Category!
    tags: [Tag]!
    owner: User
  }

  type Query {
    nearPlaces: [Place]
  }
`

export default typeDefs
