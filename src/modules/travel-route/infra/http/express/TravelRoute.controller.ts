import { NextFunction, Request, Response } from 'express'

import { CreatedTravelRouteDTO, TravelRouteToCreateDTO } from '../../../dtos/CreateTravelRoute.dto'
import { TravelRouteFoundDTO, TravelRouteToFindDTO } from '../../../dtos/GetTravelRoute.dto'
import { IUseCase } from '../../../use-cases/IUseCase'

export default class TravelRouteController {
  constructor (
    private createTravelRoute: IUseCase<TravelRouteToCreateDTO, CreatedTravelRouteDTO>,
    private getBestTravelRoute: IUseCase<TravelRouteToFindDTO, TravelRouteFoundDTO>
  ) {}

  async create (
    req: Request<never, never, TravelRouteToCreateDTO, never>,
    res: Response<CreatedTravelRouteDTO>,
    next: NextFunction
  ) {
    try {
      const travelRouteToCreate = req.body
      const createdTravelRoute = await this.createTravelRoute.execute(travelRouteToCreate)

      res.status(201).json(createdTravelRoute)
    } catch (error) {
      next(error)
    }
  }

  async getOne (
    req: Request<never, never, TravelRouteToFindDTO, never>,
    res: Response<{ bestTravelFound: string }>,
    next: NextFunction
  ) {
    try {
      const travelRouteToFind = req.body
      const bestTravelFound = await this.getBestTravelRoute.execute(travelRouteToFind)

      res.status(200).json({ bestTravelFound })
    } catch (error) {
      next(error)
    }
  }
}
