import { bestTravelRouteFactory } from '../domain'
import { travelRouteRepository } from '../infra/database'
import CreateTravelRouteUseCase from './create-travel-route/CreateTravelRoute.useCase'
import GetBestTravelRouteUseCase from './get-best-travel-route.ts/GetBestTravelRoute.useCase'

const createTravelRoute = new CreateTravelRouteUseCase(travelRouteRepository)

const getBestTravelRoute = new GetBestTravelRouteUseCase(
  bestTravelRouteFactory,
  travelRouteRepository
)

export { createTravelRoute, getBestTravelRoute }
