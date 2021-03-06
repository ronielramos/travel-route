import { IBestTravelRouteFactory } from '../../domain/factories/IBestTravelRoute.factory'
import { TravelRouteFoundDTO, TravelRouteToFindDTO } from '../../dtos/GetTravelRoute.dto'
import { ITravelRouteRepository } from '../../domain/ITravelRoute.repository'
import { IUseCase } from '../IUseCase'

export default class GetBestTravelRouteUseCase implements IUseCase<TravelRouteToFindDTO, TravelRouteFoundDTO> {
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
