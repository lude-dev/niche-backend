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
    place: [Place]
  }

  type Place {
    _id: ID!
    name: String!
    location: Location!
    category: Category!
    tags: [Tag]!
    owner: User
    verified: Boolean!
  }

  input LocationInput {
    lon: Float!
    lat: Float!
  }

  type Mutation {
    createPlace(
      name: String!
      location: LocationInput!
      category: String
      tags: [String]
    ): Place

    createCategory(
      label: String!
    ): Category

    createTag(
      label: String!
    ): Tag
  }

  type Query {
    nearPlaces(
      lat: Float!,
      lon: Float!,
    ): [Place]
    category(query: String): [Category]
  }
`

export default typeDefs
