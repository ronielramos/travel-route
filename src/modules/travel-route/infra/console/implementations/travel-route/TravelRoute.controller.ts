import ILogger from '../../../../../../shared/infra/logger/ILogger'
import { IConsoleAccess } from '../../../../../../shared/providers/console-access/IConsoleAccess.provider'
import { Airport } from '../../../../domain/BestTravelRoute'

import { TravelRouteFoundDTO, TravelRouteToFindDTO } from '../../../../dtos/GetTravelRoute.dto'
import { IUseCase } from '../../../../use-cases/IUseCase'
import { IConsoleController } from '../../IConsole.controller'

export default class TravelRouteController implements IConsoleController {
  private inputValidator: RegExp

  constructor (
    private consoleAccess: IConsoleAccess,
    private getTravelRoute: IUseCase<TravelRouteToFindDTO, TravelRouteFoundDTO>,
    private logger: ILogger
  ) {
    this.inputValidator = /[a-z]-[a-z]/i
  }

  async execute (): Promise<void> {
    while (true) {
      const route = (await this.consoleAccess.ask('Please enter the route on format "ORIGIN-DESTINATION":'))
        .trim()

      const isValid = this.isValidTravelRoute(route)

      if (!isValid) continue

      const originAndDestination = route
        .split('-')
        .map(route => route
          .toUpperCase()
          .trim()
        )

      const [origin, destination] = originAndDestination as [Airport, Airport]
      try {
        const travelRouteFound = await this.getTravelRoute.execute({ origin, destination })
        this.logger.info('best route: ' + travelRouteFound)
      } catch (error) {
        this.logger.error('Ops, this route was not found!')
      }
    }
  }

  private isValidTravelRoute (route: string): boolean {
    return this.inputValidator.test(route)
  }
}
