import { celebrate, Joi, Segments } from 'celebrate'

import { TravelRouteToFindDTO } from '../../../../dtos/GetTravelRoute.dto'

export const validateGetTravelRouteInputMiddleware = celebrate({
  [Segments.BODY]: Joi
    .object<TravelRouteToFindDTO>()
    .keys({
      origin: Joi.string().required(),
      destination: Joi.string().required()
    })
    .required()
    .unknown()
})
