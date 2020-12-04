import { logger } from '../../../../../../shared/infra/logger'
import { consoleAccess } from '../../../../../../shared/providers/console-access'
import { getBestTravelRoute } from '../../../../use-cases'
import TravelRouteController from './TravelRoute.controller'

const travelRouteController = new TravelRouteController(
  consoleAccess,
  getBestTravelRoute,
  logger
)

export { travelRouteController }
