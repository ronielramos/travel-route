import { CreateTravelRouteDTO } from '../dtos/CreateTravelRoute.dto'

export interface ITravelRouteRepository {
  getAll(): Promise<CreateTravelRouteDTO[]>
  create({ origin, destination, price }: CreateTravelRouteDTO): Promise<void>
  initialize(initialFileAddress: string): void | Promise<void>
}
