import GetTravelRouteDTO from '../dtos/GetTravelRoute.dto'
import { Airport, BestTravelRouteFound, Edge, Graph, Node, Travel } from './BestTravelRoute.d'

export default class BestTravelRoute {
  private graph: Graph

  constructor () {
    this.graph = {
      nodes: [],
      edges: []
    }
  }

  find (travel: Travel, travelRoutes: GetTravelRouteDTO[]): BestTravelRouteFound {
    const visitedAirports = [travel.origin]
    const airportsAvaliable = this.getAirportsAvaliable(travelRoutes)

    let openEdge: boolean

    this.graph.nodes = this.createNodes(visitedAirports, airportsAvaliable)

    do {
      const createdEdges = this.createEdges(visitedAirports, travelRoutes)

      this.graph.edges.push(...createdEdges)

      openEdge = this.findBestEdge(visitedAirports, travel.destination)

      if (visitedAirports[visitedAirports.length - 1]?.includes(travel.destination)) return visitedAirports.join(' - ')
    } while (openEdge)

    return ''
  }

  private findBestEdge (
    visitedAirports: Airport[],
    finalDestination: Airport
  ) {
    if (this.graph.edges.length === 0) return false

    const selectedEdge = this.graph.edges
      .filter(edge => !edge.visited || !edge.destination.visited)
      .reduce((prev, current) => (prev.price > current.price) ? current : prev)

    selectedEdge.visited = true
    selectedEdge.destination.visited = true
    selectedEdge.destination.price = selectedEdge.price

    if (selectedEdge.origin.name === finalDestination) return false

    visitedAirports.push(selectedEdge.origin.name + ' - ' + selectedEdge.destination.name)

    return true
  }

  private createEdges (
    visitedAirports: Airport[],
    travelRoutes: GetTravelRouteDTO[]
  ) {
    const lastAirport = (visitedAirports[visitedAirports.length - 1])?.split('-').pop()?.trim() as Airport

    const travelRoutesForAirport = travelRoutes.filter(route => route.origin === lastAirport)
    const originNode = this.graph.nodes.find(node => node.name === lastAirport)

    const priceUntilNow = this.graph.edges.find(edge => edge.visited && edge.destination.name === lastAirport)
      ?.price ?? 0

    if (!originNode) return []

    const createdEdges = travelRoutesForAirport
      .map(route => {
        const destinationNodeIndex = this.graph.nodes
          .findIndex(node => node.name === route.destination && !node.visited)

        if (destinationNodeIndex <= 0) return null

        const currentEdge: Edge = {
          destination: this.graph.nodes[destinationNodeIndex] as Node,
          origin: originNode,
          visited: false,
          price: route.price + priceUntilNow
        }

        return currentEdge
      })
      .filter(edge => edge != null) as Edge[]

    return createdEdges
  }

  private createNodes (
    visitedAirports: Airport[],
    airportsAvaliable: Set<Airport>
  ) {
    const createdNodes: Node[] = []

    airportsAvaliable.forEach(airport => {
      const airportAlreadyVisited = visitedAirports.includes(airport)

      const currentNode: Node = {
        name: airport,
        visited: airportAlreadyVisited,
        price: airportAlreadyVisited ? 0 : Infinity
      }

      createdNodes.push(currentNode)
    })

    return createdNodes
  }

  private getAirportsAvaliable (travelRoutes: { destination: Airport; origin: Airport; }[]) {
    const airportsAvaliable = new Set<Airport>()

    travelRoutes.forEach(route => {
      airportsAvaliable.add(route.destination)
      airportsAvaliable.add(route.origin)
    })

    return airportsAvaliable
  }
}
