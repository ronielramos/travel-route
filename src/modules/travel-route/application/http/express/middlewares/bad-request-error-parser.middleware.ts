import { BestTravelRouteError } from '../../../../domain/errors/BestTravelRouteError'
import { BadRequestError } from '../../../../../../shared/application/http/errors/implementations/BadRequestError'
import { Request, Response, NextFunction } from 'express'

export const badRequestErrorParser = (error: Error, _req: Request, _res: Response, next: NextFunction) => {
  const isBestTravelRouteError = error instanceof BestTravelRouteError

  let badRequestError: BadRequestError | undefined

  if (isBestTravelRouteError) {
    badRequestError = new BadRequestError(error.message)
    badRequestError.stack = error.stack
  }

  next(badRequestError ?? error)
}
