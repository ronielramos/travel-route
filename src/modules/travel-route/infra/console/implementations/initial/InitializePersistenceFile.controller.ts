import { IConsoleAccess } from '../../../../../../shared/providers/console-access/IConsoleAccess'
import { IFileAccess } from '../../../../../../shared/providers/file-access/IFileAccess'
import { INITIAL_DATA_SOURCE_ADDRESS } from '../../../database/utils/initial-data-source-name'
import { IConsoleController } from '../../IConsoleController'

export default class InitializePersistenceFileController implements IConsoleController {
  constructor (
    private consoleAccess: IConsoleAccess,
    private fileAccess: IFileAccess
  ) {}

  async execute () {
    let fileName: string

    do {
      fileName = await this.consoleAccess.ask('insert filename with the list of travel routes: ')
    } while (!fileName)

    this.fileAccess.overWrite(INITIAL_DATA_SOURCE_ADDRESS, fileName)

    this.consoleAccess.close()
  }
}
