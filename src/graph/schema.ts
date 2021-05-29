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

  type Heart {
    _id: ID!
    place: Place
  }

  type TokenInfo {
    accessToken: String!
  }

  type RegisterdInfo {
    email: String!
    accessToken: String!
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

    registerUser(
      email: String!
      password: String!
      name: String!
      profileImage: String
    ): RegisterdInfo

    login(
      email: String!
      password: String!
    ): TokenInfo

    newHeart(
      place: String
    ): Heart
  }

  type Query {
    nearPlaces(
      lat: Float!,
      lon: Float!,
    ): [Place]
    category(query: String): [Category]
    myHearts: [Heart]
  }
`

export default typeDefs
