import { bestTravelRouteFactory } from '../domain'
import { travelRouteRepository } from '../infra/database'
import CreateTravelRouteUseCase from './create-travel-route/CreateTravelRoute.use-case'
import GetBestTravelRouteUseCase from './get-best-travel-route.ts/GetBestTravelRoute.use-case'

const createTravelRoute = new CreateTravelRouteUseCase(travelRouteRepository)

const getBestTravelRoute = new GetBestTravelRouteUseCase(
  bestTravelRouteFactory,
  travelRouteRepository
)

export { createTravelRoute, getBestTravelRoute }
