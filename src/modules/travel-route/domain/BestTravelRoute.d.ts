export type Airport = string
export type Dollar = number

export type Travel = {
  origin: Airport
  destination: Airport
}

/**
 * @example 'GRU - BRC - SCL - ORL - CDG'
*/
export type BestTravelRouteFound = string

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

export type Graph = {
  nodes: Node[]
  edges: Edge[]
}
