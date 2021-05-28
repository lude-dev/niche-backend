interface Location {
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
  location: Location
  category: Category
  tags: Tag[]
  name: string
  verified: boolean
}