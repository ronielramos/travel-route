import { celebrate, Joi, Segments } from 'celebrate'

export const validateGetTravelRouteInputMiddleware = celebrate({
  [Segments.PARAMS]: Joi
    .object<{ routeName: string }>()
    .keys({
      routeName: Joi.string().pattern(/[a-z]-[a-z]/i, 'ORIGIN-DESTINATION').required()
    })
    .required()
    .unknown()
})
