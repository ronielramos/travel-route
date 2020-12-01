import { initializePersistenceFileController } from '../../../modules/travel-route/infra/console'
import { logger } from '../logger'
import CommandLineApplication from './applications/ConsoleApplication'

const commandLineApplication = new CommandLineApplication(logger)

commandLineApplication.initialize(initializePersistenceFileController)
