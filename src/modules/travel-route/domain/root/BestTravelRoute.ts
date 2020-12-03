import { CreatedTravelRouteDTO } from '../../dtos/CreateTravelRoute.dto'
import { TravelRouteFoundDTO, TravelRouteToFindDTO } from '../../dtos/GetTravelRoute.dto'
import { Airport } from '../domain'
import { IGraph } from '../value-objecs/IGraph'
import { IPath } from '../value-objecs/IPath'

export default class BestTravelRoute {
  constructor (private graph: IGraph, private path: IPath) {}

  find (travel: TravelRouteToFindDTO, travelRoutes: CreatedTravelRouteDTO[]): TravelRouteFoundDTO {
    const visitedAirports = [travel.origin]
    const airportsAvaliable = this.getAirportsAvaliable(travelRoutes)

    const initialNode = this.graph
      .createNodes(airportsAvaliable)
      .getOneNode(travel.origin)

    initialNode.price = 0
    initialNode.visited = true

    let destinationFoud = false

    do {
      const lastAirport = (visitedAirports[visitedAirports.length - 1]) as Airport
      const travelRoutesForAirport = travelRoutes.filter(route => route.origin === lastAirport)

      const bestEdge = this.graph
        .createEdges(lastAirport, travelRoutesForAirport)
        .findBestEdge(travel.destination)

      if (!bestEdge) break

      visitedAirports.push(bestEdge.destination.name)

      this.path.addEdgeOnPath(bestEdge)

      destinationFoud = visitedAirports.includes(travel.destination)
    } while (!destinationFoud)

    const bestPathToDestination = this.path.findBestPath(travel.destination)

    return bestPathToDestination ? `${travel.origin} - ${bestPathToDestination}` : ''
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
