/**
 * @example 'GRU'
 */
export type Airport = string

/**
 * @example '50' | '50.00'
 */
export type Dollar = number

/**
 * @example 'GRU - BRC'
 */
export type SingleRoute = string

/**
 * @example travel = { origin: 'GRU', destination: 'BRC' }
 */
export type Travel = { origin: Airport, destination: Airport }

/**
 * @example 'GRU - BRC - SCL - ORL - CDG > $40'
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
