import { IConsoleController } from '../../../../modules/travel-route/infra/console/IConsole.controller'
import ILogger from '../../logger/ILogger'

export default class CommandLineApplication {
  constructor (private logger: ILogger) {}

  async initialize (consoleController: IConsoleController): Promise<void> {
    await consoleController.execute()
    this.logger.info('Finished!')
  }
}
