import { bestTravelRoute } from '../domain'
import { travelRouteRepository } from '../infra/database'
import CreateTravelRoute from './create-travel-route/CreateTravelRoute'
import GetBestTravelRoute from './get-best-travel-route.ts/GetBestTravelRoute'

const createTravelRoute = new CreateTravelRoute(travelRouteRepository)

const getBestTravelRoute = new GetBestTravelRoute(
  bestTravelRoute,
  travelRouteRepository
)

export { createTravelRoute, getBestTravelRoute }
