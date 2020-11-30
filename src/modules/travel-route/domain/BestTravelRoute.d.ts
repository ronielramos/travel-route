/**
 * @example 'GRU'
 */
export type Airport = string

/**
 * @example '50' | '50.00'
 */
export type Dollar = number

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
