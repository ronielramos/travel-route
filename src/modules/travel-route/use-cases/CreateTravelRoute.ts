import { CreatedTravelRouteDTO, TravelRouteToCreateDTO } from '../dtos/CreateTravelRoute.dto'
import { IUseCase } from './IUseCase'

export default class CreateTravelRoute implements IUseCase<TravelRouteToCreateDTO, CreatedTravelRouteDTO> {
  async execute (data: TravelRouteToCreateDTO): Promise<CreatedTravelRouteDTO> {
    throw new Error('Not Implemented')
  }
}
