import { createTravelRoute, getBestTravelRoute } from '../../../../use-cases'
import TravelRouteController from './TravelRoute.controller'

export const travelRouteController = new TravelRouteController(
  createTravelRoute,
  getBestTravelRoute
)
