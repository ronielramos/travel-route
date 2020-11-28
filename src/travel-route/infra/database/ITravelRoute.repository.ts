import CreateTravelRouteDTO from '../../dtos/CreateTravelRoute.dto'
import GetTravelRouteDTO from '../../dtos/GetTravelRoute.dto'

export interface ITravelRouteRepository {
  getAll(): Promise<GetTravelRouteDTO[]>
  create(route: CreateTravelRouteDTO): Promise<void>
}
