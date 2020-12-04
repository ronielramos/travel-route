import { NextFunction, Request, Response } from 'express'

import { BadRequestError } from '../../../../../../shared/infra/http/errors/implementations/BadRequestError'
import { BestTravelRouteError } from '../../../../domain/errors/BestTravelRouteError'

export const badRequestErrorParser = (error: Error, _req: Request, _res: Response, next: NextFunction) => {
  const isBestTravelRouteError = error instanceof BestTravelRouteError

  let badRequestError: BadRequestError | undefined

  if (isBestTravelRouteError) {
    badRequestError = new BadRequestError(error.message)
    badRequestError.stack = error.stack
  }

  next(badRequestError ?? error)
}
