export default interface ILogger {
  debug(message: unknown): void
  error(message: unknown): void
  info(message: unknown): void
  log(message: unknown): void
  warn(message: unknown): void
}
