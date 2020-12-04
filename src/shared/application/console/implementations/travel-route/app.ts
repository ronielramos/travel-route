import { travelRouteController }
  from '../../../../../modules/travel-route/application/console/implementations/travel-route'
import { logger } from '../../../../infra/logger'
import CommandLineApplication from '../../applications/ConsoleApplication'

const commandLineApplication = new CommandLineApplication(logger)

commandLineApplication.initialize(travelRouteController)
