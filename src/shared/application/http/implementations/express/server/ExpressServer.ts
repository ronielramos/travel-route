import cors, { CorsOptions } from 'cors'
import express, { Application, ErrorRequestHandler, Router } from 'express'
import helmet from 'helmet'
import { Server } from 'http'

import ILogger from '../../../../../infra/logger/ILogger'

export default class ExpressServer {
  private app: Application
  private server: Server | undefined
  private route: Router
  private version: string

  constructor (private logger: ILogger) {
    this.app = express()
    this.route = Router()
    this.version = '/'
  }

  applyJsonBodyParser () {
    this.app.use(express.json())

    return this
  }

  applySecurityHeaders () {
    this.app.use(helmet())

    return this
  }

  applyCorsConfiguration () {
    const corsOptions: CorsOptions = {
      allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With'],
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
      origin: '*'
    }

    this.app.use(cors(corsOptions))

    return this
  }

  /**
   * @example version = '/v1'
   */
  setApiVersion (version: string) {
    this.version = version

    return this
  }

  addRoutes (routesInfo: { address: string, route: Router }[]) {
    routesInfo.forEach(route => {
      this.route.use(route.address, route.route)
    })

    return this
  }

  addErrorHandler (handler: ErrorRequestHandler) {
    this.route.use(handler)

    return this
  }

  initialize (port: number) {
    this.app.use(this.version, this.route)

    const server = this.app
      .listen(port, () => this.logger.info('Server initialized on port: ' + port))

    this.server = server

    return this
  }

  getServer (): Server {
    if (this.server) return this.server
    throw new Error('Server was not initialized!')
  }
}
