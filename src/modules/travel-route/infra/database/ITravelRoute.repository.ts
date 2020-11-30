import { CreatedTravelRouteDTO, TravelRouteToCreateDTO } from '../../dtos/CreateTravelRoute.dto'

export interface ITravelRouteRepository {
  getAll(): Promise<CreatedTravelRouteDTO[]>
  create(data: TravelRouteToCreateDTO): Promise<CreatedTravelRouteDTO>
  initialize(initialFile: string): void | Promise<void>
}
