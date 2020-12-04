import { CreatedTravelRouteDTO, TravelRouteToCreateDTO } from '../../../dtos/CreateTravelRoute.dto'

export interface ITravelRouteRepository {
  getAll(): Promise<CreatedTravelRouteDTO[]>
  create(travelRoute: TravelRouteToCreateDTO): Promise<CreatedTravelRouteDTO>
  initialize(initialFileAddress: string): void | Promise<void>
}
