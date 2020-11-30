import { TravelRouteFoundDTO, TravelRouteToFindDTO } from '../dtos/GetTravelRoute.dto'
import { IUseCase } from './IUseCase'

export default class GetBestTravelRoute implements IUseCase<TravelRouteToFindDTO, TravelRouteFoundDTO> {
  async execute (data: TravelRouteToFindDTO): Promise<TravelRouteFoundDTO> {
    throw new Error('Not Implemented')
  }
}
