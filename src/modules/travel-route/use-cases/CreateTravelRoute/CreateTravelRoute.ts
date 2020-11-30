import { CreatedTravelRouteDTO, TravelRouteToCreateDTO } from '../../dtos/CreateTravelRoute.dto'
import { IUseCase } from '../IUseCase'
import { ITravelRouteRepository } from '../../infra/database/ITravelRoute.repository'

export default class CreateTravelRoute implements IUseCase<TravelRouteToCreateDTO, CreatedTravelRouteDTO> {
  constructor (
    private travelRouteRepository: ITravelRouteRepository
  ) {}

  async execute (data: TravelRouteToCreateDTO): Promise<CreatedTravelRouteDTO> {
    const travelRouteCreated = await this.travelRouteRepository.create(data)
    return travelRouteCreated
  }
}
