import { HttpError } from './IHttpError'

export class BadRequestError extends Error implements HttpError {
  readonly name = 'BadRequestError'
  readonly statusCode = 400
}
