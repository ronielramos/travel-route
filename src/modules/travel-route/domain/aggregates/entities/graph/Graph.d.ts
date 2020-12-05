import { Airport, Dollar } from '../../../BestTravelRoute'

export type Node = {
  name: Airport
  price: Dollar
  visited: boolean
}

export type Edge = {
  price: Dollar
  origin: Node
  destination: Node
  visited: boolean
}
