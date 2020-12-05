/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'

import { HttpError } from '../../../errors/IHttp.error'
import { logger } from '../../../../../infra/logger/index'

export default function handleHttpError (
  error: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  logger.error(error)
  const statusCode = error.statusCode ?? 500
  const message = statusCode === 500 ? 'Internal Server Error' : error.message

  res.status(statusCode).json({ message })
}
