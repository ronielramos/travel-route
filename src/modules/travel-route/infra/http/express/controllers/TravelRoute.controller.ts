import { NextFunction, Request, Response } from 'express'

import { CreateTravelRouteDTO, TravelRouteToCreateDTO } from '../../../../dtos/CreateTravelRoute.dto'
import { TravelRouteFoundDTO, TravelRouteToFindDTO } from '../../../../dtos/GetTravelRoute.dto'
import { IUseCase } from '../../../../use-cases/IUseCase'

export default class TravelRouteController {
  constructor (
    private createTravelRoute: IUseCase<TravelRouteToCreateDTO, CreateTravelRouteDTO>,
    private getBestTravelRoute: IUseCase<TravelRouteToFindDTO, TravelRouteFoundDTO>
  ) {}

  async create (
    req: Request<never, never, TravelRouteToCreateDTO, never>,
    res: Response<CreateTravelRouteDTO>,
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
    req: Request<{ routeName: string }, never, never, never>,
    res: Response<{ bestTravelFound: string }>,
    next: NextFunction
  ) {
    try {
      const [origin, destination] = req.params.routeName.toUpperCase().split('-') as [string, string]
      const bestTravelFound = await this.getBestTravelRoute.execute({ origin, destination })

      res.status(200).json({ bestTravelFound })
    } catch (error) {
      next(error)
    }
  }
}
