export interface LocationField {
  coordinates: number[]
  type: 'Point'
}

interface Doc {
  _id: string
}

export interface Category extends Doc {
  label: string
}

export interface Tag extends Doc {
  label: string
}

export interface Place extends Doc {
  location: LocationField
  category: string
  tags: string[]
  name: string
  verifier: string[]
}

export interface Auth extends Doc {
  email: string
  hashedPassword: string
}

export interface User extends Doc {
  name: string
  profile: string
  uid: string
  wallet: string
}

export interface Heart extends Doc {
  place: string
  user: string
}

export interface Wallet extends Doc {
  user: string
  balance: number
}

export interface Comment extends Doc {
  content: string
  photo: string[]
  place: string
  user: string
}

export interface FixReport extends Doc {
  placeId: string
  type: | 'name' | 'location' | 'category' | 'tag'
  action: | 'set' | 'remove' | 'add'
  value?: string
  newLocation?: LocationField
  approved: number
}
