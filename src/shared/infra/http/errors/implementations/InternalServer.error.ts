import { HttpError } from '../IHttp.error'

export class InternalServerError extends Error implements HttpError {
  readonly name = 'InternalServerError'
  readonly statusCode = 500
}
