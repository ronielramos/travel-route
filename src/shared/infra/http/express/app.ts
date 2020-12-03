import { Router } from 'express'

import travelRouteRouter from '../../../../modules/travel-route/infra/http/express/routes/travelRoute.routes'
import ConsoleLogger from '../../logger/implementations/ConsoleLogger'
import ExpressServer from './ExpressServer'
import handleHttpError from './handleHttpError'
import handleUncaughtException from './handleUncaughtException'

const logger = new ConsoleLogger()
const expressServer = new ExpressServer(logger)

const routesInfo: { address: string, route: Router }[] = [
  { address: '/travel-route', route: travelRouteRouter }
]

/**
 * If no value was provided, this port will be used
 */
const DEFAULT_PORT = 80

const PORT = process.env.PORT ? parseInt(process.env.PORT) : DEFAULT_PORT

const server = expressServer
  .applyJsonBodyParser()
  .applyCorsConfiguration()
  .applyJsonBodyParser()
  .setApiVersion('/v1')
  .addRoutes(routesInfo)
  .addErrorHandler(handleHttpError)
  .initialize(PORT)
  .getServer()

process.on('uncaughtException', (error) => {
  logger.error(error)
  handleUncaughtException(server)
})

process.on('unhandledRejection', (error) => {
  logger.error(error)
  handleUncaughtException(server)
})
