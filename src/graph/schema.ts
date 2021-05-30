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
    profileImage: String
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
    comment: [Comment]!
    hearted: Boolean!
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

  type Comment {
    content: String!
    photo: [String]!
    place: Place!
    user: User!
  }

  type FixReport {
    place: Place!
    type: String!
    action: String!
    value: String
    newLocation: Location
    approved: Int!
  }

  type FixReportPile {
    place: Place!
    properties: [FixReport]
  }

  input FixTag {
    action: String
    tagId: String
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

    addComment(
      place: String!
      content: String!
    ):  Comment

    createFixReport(
      placeId: String!
      name: String
      location: LocationInput
      category: String
      tag: FixTag
    ): FixReportPile
  }

  type Query {
    nearPlaces(
      lat: Float!,
      lon: Float!,
    ): [Place]
    category(query: String): [Category]
    place(placeId: ID!): Place
    myHearts: [Heart]
    nearFixReport(
      lat: Float!,
      lon: Float!,
    ): [FixReport]
  }
`

export default typeDefs
