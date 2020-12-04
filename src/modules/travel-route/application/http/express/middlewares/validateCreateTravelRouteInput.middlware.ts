import { celebrate, Joi, Segments } from 'celebrate'

import { TravelRouteToCreateDTO } from '../../../../dtos/CreateTravelRoute.dto'

export const validateCreateTravelRouteInputMiddleware = celebrate({
  [Segments.BODY]: Joi
    .object<TravelRouteToCreateDTO>()
    .keys({
      routeName: Joi.string().pattern(/[a-z]-[a-z]/i, 'ORIGIN-DESTINATION').required(),
      routePrice: Joi.number().required()
    })
    .required()
    .unknown()
})
