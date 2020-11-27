export class BadRequestError extends Error {
  readonly name = 'BadRequestError'
  readonly statusCode = 400
}
