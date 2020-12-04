import {
  initializePersistenceFileController
} from '../../../../../modules/travel-route/application/console/implementations/initial'
import { logger } from '../../../../infra/logger'
import CommandLineApplication from '../../applications/ConsoleApplication'

const commandLineApplication = new CommandLineApplication(logger)

commandLineApplication.initialize(initializePersistenceFileController)

process.on('unhandledRejection', (error) => {
  logger.error(error)
  process.exit()
})
