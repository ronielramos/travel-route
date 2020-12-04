import { CreatedTravelRouteDTO, TravelRouteToCreateDTO } from '../../dtos/CreateTravelRoute.dto'
import { ITravelRouteRepository } from '../../infra/database/repositories/ITravelRoute.repository'
import { IUseCase } from '../IUseCase'

export default class CreateTravelRouteUseCase implements IUseCase<TravelRouteToCreateDTO, CreatedTravelRouteDTO> {
  constructor (private travelRouteRepository: ITravelRouteRepository) {}

  async execute (data: TravelRouteToCreateDTO): Promise<CreatedTravelRouteDTO> {
    const travelRouteCreated = await this.travelRouteRepository.create(data)
    return travelRouteCreated
  }
}
