import { HttpError } from './IHttpError'

export class InternalServerError extends Error implements HttpError {
  readonly name = 'InternalServerError'
  readonly statusCode = 500
}
