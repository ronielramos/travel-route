import { ITravelRouteRepository } from '../ITravelRoute.repository'
import CreateTravelRouteDTO from '../../../dtos/CreateTravelRoute.dto'
import GetTravelRouteDTO from '../../../dtos/GetTravelRoute.dto'

export default class FakeTravelRouteRepository implements ITravelRouteRepository {
  private travelRoutes: GetTravelRouteDTO[]

  constructor () {
    this.travelRoutes = []
  }

  async getAll (): Promise<GetTravelRouteDTO[]> {
    return this.travelRoutes
  }

  async create (data: CreateTravelRouteDTO): Promise<void> {
    const [origin, destination] = data.routeName
      .split('-')
      .map(route => route.trim().toUpperCase()) as [string, string]

    this.travelRoutes.push({ destination, origin, price: data.routePrice })
  }
}
