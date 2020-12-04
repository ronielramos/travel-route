import { Airport, Edge, Node } from '../../../BestTravelRoute'
import { CreateTravelRouteDTO } from '../../../../dtos/CreateTravelRoute.dto'
import { IGraph } from './IGraph'

export class InMemoryGraph implements IGraph {
  private nodes: Node[]
  private edges: Edge[]

  constructor () {
    this.edges = []
    this.nodes = []
  }

  createEdges (originNode: Node, travelRoutesForAirport: CreateTravelRouteDTO[]) {
    const edge = this.edges.find(edge => edge.visited && edge.destination === originNode)
    const priceUntilNow = edge?.price ?? 0

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
