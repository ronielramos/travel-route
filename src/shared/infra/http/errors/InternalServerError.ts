export class InternalServerError extends Error {
  readonly name = 'InternalServerError'
  readonly statusCode = 500
}
