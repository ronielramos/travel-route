import { CreatedTravelRouteDTO } from '../dtos/CreateTravelRoute.dto'
import { Airport, BestTravelRouteFound, Edge, Graph, Node, Travel } from './BestTravelRoute.d'

export default class BestTravelRoute {
  private graph: Graph
  private paths: Edge[][]

  constructor () {
    this.graph = {
      nodes: [],
      edges: []
    }

    this.paths = []
  }

  find (travel: Travel, travelRoutes: CreatedTravelRouteDTO[]): BestTravelRouteFound {
    const visitedAirports = [travel.origin]
    const airportsAvaliable = this.getAirportsAvaliable(travelRoutes)

    this.graph.nodes = this.createNodes(airportsAvaliable)

    const initialNodeIndex = this.graph.nodes.findIndex(node => node.name === travel.origin)
    const initialNode = this.graph.nodes[initialNodeIndex] as Node

    initialNode.price = 0
    initialNode.visited = true

    let bestEdge: Edge | undefined
    let destinationFoud = false

    do {
      const createdEdges = this.createEdges(visitedAirports, travelRoutes)
      this.graph.edges.push(...createdEdges)

      bestEdge = this.findBestEdge(this.graph.edges, travel.destination)
      if (!bestEdge) break

      visitedAirports.push(bestEdge.destination.name)

      this.sortPaths(bestEdge, this.paths)

      destinationFoud = visitedAirports.includes(travel.destination)
    } while (!destinationFoud)

    const bestPathToDestination = this.findBestPath(this.paths, travel.destination)

    return bestPathToDestination ? `${travel.origin} - ${bestPathToDestination}` : ''
  }

  private findBestPath (paths: Edge[][], destinationAirport: Airport) {
    const pathsToDestination = paths
      .filter(path => !!path.find(edge => edge.destination.name === destinationAirport))
      .map(path => {
        const lastIndex = path.length - 1

        const pathPrice = path[lastIndex]?.price as number

        return {
          path,
          price: pathPrice
        }
      })

    const pathFound = pathsToDestination
      .sort((pathA, pathB) => pathA.price - pathB.price)
      .pop()

    const completeRoute = pathFound?.path
      .map(path => path.destination.name)
      .reduce((prev, curr) => `${prev} - ${curr}`)

    return completeRoute && pathFound?.price
      ? `${completeRoute} > $${pathFound.price}`
      : ''
  }

  private sortPaths (selectedEdge: Edge, paths: Edge[][]) {
    let sorted = false

    paths.forEach((edges) => {
      const lastIndexOnEdge = (edges.length - 1)

      const lastEdge = edges[lastIndexOnEdge]

      const edgeIsFound = !!lastEdge && (lastEdge.destination === selectedEdge.origin)

      if (edgeIsFound) {
        edges.push(selectedEdge)
        sorted = true
      }

      if (!!lastEdge && lastEdge.origin === selectedEdge.origin) {
        const othersEdges = edges.length > 1
          ? edges.filter((_edge, index) => index <= (lastIndexOnEdge - 1))
          : []

        paths.push([...othersEdges, selectedEdge])
        sorted = true
      }
    })

    if (!sorted) paths.push([selectedEdge])
    return sorted
  }

  private findBestEdge (
    edges: Edge[],
    finalDestination: Airport
  ) {
    if (edges.length === 0) return

    const selectedEdgeOptions = edges
      .filter(edge => !edge.destination.visited)

    if (selectedEdgeOptions.length === 0) return

    const selectedEdge = selectedEdgeOptions
      .reduce((prev, current) => (prev.price > current.price) ? current : prev)

    selectedEdge.visited = true
    selectedEdge.destination.visited = true
    selectedEdge.destination.price = selectedEdge.price

    if (selectedEdge.origin.name === finalDestination) return

    return selectedEdge
  }

  private createEdges (
    visitedAirports: Airport[],
    travelRoutes: CreatedTravelRouteDTO[]
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

        if (destinationNodeIndex < 0) return null

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

  private createNodes (airportsAvaliable: Set<Airport>) {
    const createdNodes: Node[] = []

    airportsAvaliable.forEach(airport => {
      const currentNode: Node = {
        name: airport,
        visited: false,
        price: Infinity
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
