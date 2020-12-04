import { errors } from 'celebrate'
import Router from 'express'

import { travelRouteController } from '../controllers'
import { badRequestErrorParser } from '../middlewares/bad-request-error-parser.middleware'
import { validateCreateTravelRouteInputMiddleware } from '../middlewares/validate-create-travel-route-input.middlware'
import { validateGetTravelRouteInputMiddleware } from '../middlewares/validate-get-travel-route-input.middlware'

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

travelRouteRouter.use(badRequestErrorParser)
travelRouteRouter.use(errors())

export default travelRouteRouter
