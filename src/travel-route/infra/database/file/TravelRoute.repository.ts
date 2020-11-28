import { ITravelRouteRepository } from '../ITravelRoute.repository'
import CreateTravelRouteDTO from '../../../dtos/CreateTravelRoute.dto'
import GetTravelRouteDTO from '../../../dtos/GetTravelRoute.dto'

export default class TravelRouteRepository implements ITravelRouteRepository {
  getAll (): Promise<GetTravelRouteDTO[]> {
    throw new Error('Method not implemented.')
  }

  create (data: CreateTravelRouteDTO): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
