/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreatedTravelRouteDTO, TravelRouteToCreateDTO } from '../../../dtos/CreateTravelRoute.dto'
import { ITravelRouteRepository } from '../ITravelRoute.repository'

export default class FakeTravelRouteRepository implements ITravelRouteRepository {
  private travelRoutes: CreatedTravelRouteDTO[]

  constructor () {
    this.travelRoutes = []
  }

  async initialize (_initialFile: string) {}

  async create (data: TravelRouteToCreateDTO): Promise<CreatedTravelRouteDTO> {
    const [origin, destination] = data.routeName
      .split('-')
      .map(route => route.trim().toUpperCase()) as [string, string]

    const travelRoute = { destination, origin, price: data.routePrice }
    this.travelRoutes.push(travelRoute)

    return travelRoute
  }

  async getAll (): Promise<CreatedTravelRouteDTO[]> {
    return this.travelRoutes
  }
}
