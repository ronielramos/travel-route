import BestTravelRoute from '../../domain/BestTravelRoute'
import { TravelRouteFoundDTO, TravelRouteToFindDTO } from '../../dtos/GetTravelRoute.dto'
import { ITravelRouteRepository } from '../../infra/database/ITravelRoute.repository'
import { IUseCase } from '../IUseCase'

export default class GetBestTravelRoute implements IUseCase<TravelRouteToFindDTO, TravelRouteFoundDTO> {
  constructor (
    private bestTravelRoute: BestTravelRoute,
    private travelRouteRepository: ITravelRouteRepository
  ) {}

  async execute (data: TravelRouteToFindDTO): Promise<TravelRouteFoundDTO> {
    const travelRoutes = await this.travelRouteRepository.getAll()
    const bestRouteFound = this.bestTravelRoute.find(data, travelRoutes)

    return bestRouteFound
  }
}
