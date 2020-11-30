import { errors } from 'celebrate'
import Router from 'express'

import CreateTravelRoute from '../../../use-cases/CreateTravelRoute/CreateTravelRoute'
import GetBestTravelRoute from '../../../use-cases/GetBestTravelRoute'
import { validateCreateTravelRouteInputMiddleware } from './middlewares/validateCreateTravelRouteInput.middlware'
import { validateGetTravelRouteInputMiddleware } from './middlewares/validateGetTravelRouteInput.middlware'
import TravelRouteController from './TravelRoute.controller'
import TravelRouteRepository from '../../database/file/TravelRoute.repository'
import BestTravelRoute from '../../../domain/BestTravelRoute'

const travelRouteRouter = Router()

const travelRouteRepository = new TravelRouteRepository(['cache', 'production'], 'input-routes.csv')

const bestTravelRoute = new BestTravelRoute()
const getBestTravelRoute = new GetBestTravelRoute(
  bestTravelRoute,
  travelRouteRepository
)

const createTravelRoute = new CreateTravelRoute(travelRouteRepository)

const travelRouteController = new TravelRouteController(
  createTravelRoute,
  getBestTravelRoute
)

travelRouteRouter.post(
  '/',
  validateCreateTravelRouteInputMiddleware,
  travelRouteController.create.bind(travelRouteController)
)

travelRouteRouter.post(
  '/priceless',
  validateGetTravelRouteInputMiddleware,
  travelRouteController.getOne.bind(travelRouteController)
)

travelRouteRouter.use(errors())

export default travelRouteRouter
