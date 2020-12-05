import {
  initializePersistenceFileController
} from '../../../../../modules/travel-route/infra/console/implementations/initial'
import { logger } from '../../../logger'
import CommandLineApplication from '../../applications/Console.application'

const commandLineApplication = new CommandLineApplication(logger)

commandLineApplication.initialize(initializePersistenceFileController)

process.on('unhandledRejection', (error) => {
  logger.error(error)
  process.exit()
})
