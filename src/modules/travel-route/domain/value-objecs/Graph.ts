import { Airport, Edge, Node } from '../domain'
import { CreatedTravelRouteDTO } from '../../dtos/CreateTravelRoute.dto'
import { IGraph } from './IGraph'

export class Graph implements IGraph {
  private nodes: Node[]
  private edges: Edge[]

  constructor () {
    this.edges = []
    this.nodes = []
  }

  createEdges (origin: Airport, travelRoutes: CreatedTravelRouteDTO[]) {
    const travelRoutesForAirport = travelRoutes.filter(route => route.origin === origin)
    const originNode = this.nodes.find(node => node.name === origin)

    const priceUntilNow = this.edges.find(edge => edge.visited && edge.destination.name === origin)
      ?.price ?? 0

    if (!originNode) return this

    const createdEdges = travelRoutesForAirport
      .map(route => {
        const destinationNodeIndex = this.nodes
          .findIndex(node => node.name === route.destination && !node.visited)

        if (destinationNodeIndex < 0) return null

        const currentEdge: Edge = {
          destination: this.nodes[destinationNodeIndex] as Node,
          origin: originNode,
          visited: false,
          price: route.price + priceUntilNow
        }

        return currentEdge
      })
      .filter(edge => edge != null) as Edge[]

    this.edges.push(...createdEdges)

    return this
  }

  createNodes (airports: Set<Airport>) {
    const createdNodes: Node[] = []

    airports.forEach(airport => {
      const currentNode: Node = {
        name: airport,
        visited: false,
        price: Infinity
      }

      createdNodes.push(currentNode)
    })

    this.nodes.push(...createdNodes)

    return this
  }

  getOneNode (name: string): Node {
    const index = this.nodes.findIndex(node => node.name === name)

    if (!this.nodes[index]) throw new Error(`Node ${name} not found!`)

    return this.nodes[index] as Node
  }

  findBestEdge (destination: Airport): Edge | undefined {
    if (this.edges.length === 0) return

    const selectedEdgeOptions = this.edges
      .filter(edge => !edge.destination.visited)

    if (selectedEdgeOptions.length === 0) return

    const selectedEdge = selectedEdgeOptions
      .reduce((prev, current) => (prev.price > current.price) ? current : prev)

    selectedEdge.visited = true
    selectedEdge.destination.visited = true
    selectedEdge.destination.price = selectedEdge.price

    if (selectedEdge.origin.name === destination) return

    return selectedEdge
  }
}
