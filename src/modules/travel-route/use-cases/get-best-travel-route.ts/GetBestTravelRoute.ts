import { TravelRouteFoundDTO, TravelRouteToFindDTO } from '../../dtos/GetTravelRoute.dto'
import { IUseCase } from '../IUseCase'
import BestTravelRoute from '../../domain/BestTravelRoute'
import TravelRouteRepository from '../../infra/database/file/TravelRoute.repository'

export default class GetBestTravelRoute implements IUseCase<TravelRouteToFindDTO, TravelRouteFoundDTO> {
  constructor (
    private readonly bestTravelRoute: BestTravelRoute,
    private readonly travelRouteRepository: TravelRouteRepository
  ) {}

  async execute (data: TravelRouteToFindDTO): Promise<TravelRouteFoundDTO> {
    const travelRoutes = await this.travelRouteRepository.getAll()
    const bestRouteFound = this.bestTravelRoute.find(data, travelRoutes)

    return bestRouteFound
  }
}
