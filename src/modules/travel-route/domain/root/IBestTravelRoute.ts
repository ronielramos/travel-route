import { CreatedTravelRouteDTO } from '../../dtos/CreateTravelRoute.dto'
import { TravelRouteFoundDTO, TravelRouteToFindDTO } from '../../dtos/GetTravelRoute.dto'

export interface IBestTravelRoute {
  find (travel: TravelRouteToFindDTO, travelRoutes: CreatedTravelRouteDTO[]): TravelRouteFoundDTO
}
