import { IBestTravelRouteFactory } from '../../domain/factories/IBestTravelRouteFactory'
import { TravelRouteFoundDTO, TravelRouteToFindDTO } from '../../dtos/GetTravelRoute.dto'
import { ITravelRouteRepository } from '../../infra/database/ITravelRoute.repository'
import { IUseCase } from '../IUseCase'

export default class GetBestTravelRoute implements IUseCase<TravelRouteToFindDTO, TravelRouteFoundDTO> {
  constructor (
    private bestTravelRouteFactory: IBestTravelRouteFactory,
    private travelRouteRepository: ITravelRouteRepository
  ) {}

  async execute ({ origin, destination }: TravelRouteToFindDTO): Promise<TravelRouteFoundDTO> {
    const travelRoutes = await this.travelRouteRepository.getAll()
    const bestRouteFound = this.bestTravelRouteFactory
      .makeBestTravelRoute()
      .find({ origin, destination }, travelRoutes)

    return bestRouteFound
  }
}
