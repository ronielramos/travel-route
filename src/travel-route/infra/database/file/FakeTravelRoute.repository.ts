import { ITravelRouteRepository } from '../ITravelRoute.repository'
import TravelRouteDTO from '../../../dtos/TravelRoute.dto'

export default class FakeTravelRouteRepository implements ITravelRouteRepository {
  private travelRoutes: TravelRouteDTO[]

  constructor () {
    this.travelRoutes = []
  }

  async getAll (): Promise<TravelRouteDTO[]> {
    return this.travelRoutes
  }

  async create (data: TravelRouteDTO): Promise<void> {
    this.travelRoutes.push(data)
  }
}
