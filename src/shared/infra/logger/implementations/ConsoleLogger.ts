import ILogger from '../ILogger'

export default class ConsoleLogger implements ILogger {
  debug (message: unknown): void {
    console.debug(message)
  }

  error (message: unknown): void {
    console.error(message)
  }

  log (message: unknown): void {
    console.log(message)
  }

  info (message: unknown): void {
    console.error(message)
  }

  warn (message: unknown): void {
    console.error(message)
  }
}
