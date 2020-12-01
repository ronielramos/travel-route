import { IConsoleController } from '../IConsoleController'
import { IConsoleAccess } from '../../../../../shared/providers/console-access/IConsoleAccess'
import { IFileAccess } from '../../../../../shared/providers/file-access/IFileAccess'
import { FileToPersist } from '../../database/utils/file.enum'

export default class InitializePersistenceFileController implements IConsoleController {
  constructor (
    private consoleAccess: IConsoleAccess,
    private FileAccess: IFileAccess
  ) {}

  async execute () {
    let fileName: string

    do {
      fileName = await this.consoleAccess.ask('insert filename with the list of travel routes: ')
    } while (!fileName)

    this.FileAccess.write(FileToPersist.file, fileName)
  }
}
