import { errors } from 'celebrate'
import Router from 'express'

import { travelRouteController } from '../controllers'
import { validateCreateTravelRouteInputMiddleware } from '../middlewares/validateCreateTravelRouteInput.middlware'
import { validateGetTravelRouteInputMiddleware } from '../middlewares/validateGetTravelRouteInput.middlware'

const travelRouteRouter = Router()

travelRouteRouter.post(
  '/',
  validateCreateTravelRouteInputMiddleware,
  travelRouteController.create.bind(travelRouteController)
)

travelRouteRouter.get(
  '/:routeName/priceless',
  validateGetTravelRouteInputMiddleware,
  travelRouteController.getOne.bind(travelRouteController)
)

travelRouteRouter.use(errors())

export default travelRouteRouter
