import ConsoleLogger from '../logger/console/ConsoleLogger'
import CommandLineApplication from './ConsoleApplication'
import TravelRouteController from '../../../modules/travel-route/infra/console/TravelRoute.controller'
import GetBestTravelRoute from '../../../modules/travel-route/use-cases/get-best-travel-route.ts/GetBestTravelRoute'

const logger = new ConsoleLogger()
const commandLineApplication = new CommandLineApplication(logger)
const getBestTravelRoute = new GetBestTravelRoute()

const travelRouteController = new TravelRouteController(
  getBestTravelRoute,
  logger
)

commandLineApplication.initialize(travelRouteController)
