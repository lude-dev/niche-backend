interface newHeartArg {
  place: string
}

const newHeart = (parent: undefined, arg: newHeartArg, context: unknown) => {
  console.log(context)
  return {}
}

export const mutation = {
  newHeart
}
