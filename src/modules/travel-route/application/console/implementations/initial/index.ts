import { consoleAccess } from '../../../../../../shared/providers/console-access'
import { fileAccess } from '../../../../../../shared/providers/file-access'
import InitializePersistenceFileController from './InitializePersistenceFile.controller'

const initializePersistenceFileController = new InitializePersistenceFileController(
  consoleAccess,
  fileAccess
)

export { initializePersistenceFileController }
