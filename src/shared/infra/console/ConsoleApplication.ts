import ILogger from '../logger/ILogger'
import { IConsoleController } from './IConsoleController'

export default class CommandLineApplication {
  constructor (private logger: ILogger) {}

  async initialize (consoleController: IConsoleController): Promise<void> {
    await consoleController.execute()
    this.logger.info('Application Initialized!')
  }
}
