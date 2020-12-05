import { travelRouteController } from '../../../../../modules/travel-route/infra/console/implementations/travel-route'
import { logger } from '../../../logger'
import CommandLineApplication from '../../applications/Console.application'

const commandLineApplication = new CommandLineApplication(logger)

commandLineApplication.initialize(travelRouteController)
