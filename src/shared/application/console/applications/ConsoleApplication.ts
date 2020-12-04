import { IConsoleController } from '../../../../modules/travel-route/application/console/IConsoleController'
import ILogger from '../../../infra/logger/ILogger'

export default class CommandLineApplication {
  constructor (private logger: ILogger) {}

  async initialize (consoleController: IConsoleController): Promise<void> {
    await consoleController.execute()
    this.logger.info('Finished!')
  }
}
