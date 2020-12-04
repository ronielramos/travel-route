import { CreateTravelRouteDTO } from '../../dtos/CreateTravelRoute.dto'
import { TravelRouteFoundDTO, TravelRouteToFindDTO } from '../../dtos/GetTravelRoute.dto'
import { IGraph } from '../aggregates/entities/graph/IGraph'
import { IPath } from '../aggregates/services/path/IPath'
import { Airport, Node } from '../BestTravelRoute'
import { BestTravelRouteError } from '../errors/BestTravelRouteError'

export default class BestTravelRoute {
  constructor (private graph: IGraph, private path: IPath) {}

  find ({ origin, destination }: TravelRouteToFindDTO, travelRoutes: CreateTravelRouteDTO[]): TravelRouteFoundDTO {
    const visitedAirports = [origin]
    const airportsAvaliable = this.getAirportsAvaliable(travelRoutes)

    const initialNode = this.graph
      .createNodes(airportsAvaliable)
      .getOneNode(origin)

    if (!initialNode) throw new BestTravelRouteError(`Origin ${origin} was not found`)

    initialNode.price = 0
    initialNode.visited = true

    let searchWasFinished = false

    do {
      const lastAirport = (visitedAirports[visitedAirports.length - 1]) as Airport
      const travelRoutesForAirport = travelRoutes.filter(route => route.origin === lastAirport)
      const originNode = this.graph.getOneNode(lastAirport) as Node

      const bestEdge = this.graph
        .createEdges(originNode, travelRoutesForAirport)
        .findBestEdge(destination)

      if (bestEdge) {
        visitedAirports.push(bestEdge.destination.name)

        this.path.addEdgeOnPath(bestEdge)
      }

      const destinationFound = visitedAirports.includes(destination)
      const edgesAreNotAvaliable = !bestEdge

      searchWasFinished = (edgesAreNotAvaliable || destinationFound)
    } while (!searchWasFinished)

    const bestPathToDestination = this.path.findBestPath(destination)

    if (!bestPathToDestination) {
      throw new BestTravelRouteError(`No one path was found from ${origin} to destination ${destination}`)
    }

    return bestPathToDestination ? `${origin} - ${bestPathToDestination}` : ''
  }

  private getAirportsAvaliable (travelRoutes: CreateTravelRouteDTO[]) {
    const airportsAvaliable = new Set<Airport>()

    travelRoutes.forEach(route => {
      airportsAvaliable.add(route.destination)
      airportsAvaliable.add(route.origin)
    })

    return airportsAvaliable
  }
}
