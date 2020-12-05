import { CreateTravelRouteDTO, TravelRouteToCreateDTO } from '../../dtos/CreateTravelRoute.dto'
import { ITravelRouteRepository } from '../../domain/ITravelRoute.repository'
import { IUseCase } from '../IUseCase'

export default class CreateTravelRouteUseCase implements IUseCase<TravelRouteToCreateDTO, CreateTravelRouteDTO> {
  constructor (private travelRouteRepository: ITravelRouteRepository) {}

  async execute ({ routeName, routePrice }: TravelRouteToCreateDTO): Promise<CreateTravelRouteDTO> {
    const [origin, destination] = routeName.split('-') as [string, string]
    const price = routePrice

    const travelRoute = {
      origin,
      destination,
      price
    }

    await this.travelRouteRepository.create(travelRoute)

    return travelRoute
  }
}
