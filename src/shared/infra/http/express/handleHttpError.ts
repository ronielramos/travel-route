/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'

import { HttpError } from '../errors/IHttpError'

export default function handleHttpError (
  error: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = error.statusCode ?? 500
  const message = statusCode === 500 ? 'Internal Error' : error.message

  res.status(error.statusCode).json({ message })
}
