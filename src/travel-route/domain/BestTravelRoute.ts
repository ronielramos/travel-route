import GetTravelRouteDTO from '../dtos/GetTravelRoute.dto'
import { Travel } from './BestTravelRoute.d'

type Node = {
  name: string;
  weight: number
  visited: boolean
}

type Edge = {
  weight: number
  origin: Node
  destination: Node
  visited: boolean
}

/**
 * @example 'GRU - BRC - SCL - ORL - CDG'
*/
type BestTravelRouteFound = string

export default class BestTravelRoute {
  find (travel: Travel, travelRoutes: GetTravelRouteDTO[]): BestTravelRouteFound {
    const visitedAirports = [travel.origin]
    const airportsAvaliable = this.getAirportsAvaliable(travelRoutes)

    let openEdge: boolean

    do {
      const nodes = this.createNodes(airportsAvaliable, visitedAirports)
      const lastAirport = visitedAirports[visitedAirports.length - 1] as string
      const edges = this.createEdges(lastAirport, nodes, travelRoutes)

      openEdge = this.findBestEdge(visitedAirports, travel.destination, { nodes, edges })
    } while (openEdge)

    if (!visitedAirports.includes(travel.destination)) return ''

    return visitedAirports.join(' - ')
  }

  private findBestEdge (
    visitedAirports: string[],
    finalDestination: string,
    graph: { nodes: Node[]; edges: Edge[] }
  ) {
    if (graph.edges.length === 0) return false

    const selectedEdge = graph.edges
      .reduce((prev, current) => prev.weight > current.weight ? current : prev)

    selectedEdge.visited = true
    selectedEdge.destination.visited = true
    selectedEdge.destination.weight = selectedEdge.weight

    if (selectedEdge.origin.name === finalDestination) return false

    visitedAirports.push(selectedEdge.destination.name)

    return true
  }

  private createEdges (
    airport: string,
    nodes: Node[],
    travelRoutes: GetTravelRouteDTO[]
  ) {
    const edges: Edge[] = []

    const travelRoutesForAirport = travelRoutes.filter(route => route.origin === airport)
    const origin = nodes.find(node => node.name === airport)

    const validEdges = travelRoutesForAirport.map(route => {
      const destinationNode = nodes.find(node => node.name === route.destination && !node.visited)
      if (!destinationNode) return null

      return {
        destination: destinationNode,
        origin: origin,
        visited: false,
        weight: route.price
      }
    })
      .filter(edge => edge) as Edge[]

    edges.push(...validEdges)

    return edges
  }

  private createNodes (
    airportsAvaliable: Set<string>,
    visitedAirports: string[]
  ) {
    const nodes: Node[] = []

    airportsAvaliable.forEach(airport => {
      const airportAlreadyVisited = visitedAirports.includes(airport)
      const currentNode = {
        name: airport,
        visited: airportAlreadyVisited,
        weight: airportAlreadyVisited ? 0 : Infinity
      }

      nodes.push(currentNode)
    })

    return nodes
  }

  private getAirportsAvaliable (travelRoutes: { destination: string; origin: string; }[]) {
    const airportsAvaliable = new Set<string>()

    travelRoutes.forEach(route => {
      airportsAvaliable.add(route.destination)
      airportsAvaliable.add(route.origin)
    })

    return airportsAvaliable
  }
}
