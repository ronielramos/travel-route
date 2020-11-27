import { ITravelRouteRepository } from '../ITravelRoute.repository'
import TravelRouteDTO from '../../../dtos/TravelRoute.dto'

export default class TravelRouteRepository implements ITravelRouteRepository {
  getAll (): Promise<TravelRouteDTO[]> {
    throw new Error('Method not implemented.')
  }

  create (route: TravelRouteDTO): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
