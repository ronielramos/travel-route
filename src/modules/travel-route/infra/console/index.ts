import { logger } from '../../../../shared/infra/logger'
import { consoleAccess } from '../../../../shared/providers/console-access'
import { fileAccess } from '../../../../shared/providers/file-access'
import { getBestTravelRoute } from '../../use-cases'
import InitializePersistenceFileController from './implementations/InitializePersistenceFile.controller'
import TravelRouteController from './implementations/TravelRoute.controller'

const initializePersistenceFileController = new InitializePersistenceFileController(
  consoleAccess,
  fileAccess
)

const travelRouteController = new TravelRouteController(
  consoleAccess,
  getBestTravelRoute,
  logger
)

export { initializePersistenceFileController, travelRouteController }
