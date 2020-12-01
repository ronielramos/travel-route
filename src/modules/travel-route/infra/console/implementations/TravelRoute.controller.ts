import ILogger from '../../../../../shared/infra/logger/ILogger'
import { IConsoleAccess } from '../../../../../shared/providers/console-access/IConsoleAccess'
import { Airport } from '../../../domain/BestTravelRoute.d'
import { TravelRouteFoundDTO, TravelRouteToFindDTO } from '../../../dtos/GetTravelRoute.dto'
import { IUseCase } from '../../../use-cases/IUseCase'
import { IConsoleController } from '../IConsoleController'

export default class TravelRouteController implements IConsoleController {
  private inputValidator: RegExp

  constructor (
    private consoleAccess: IConsoleAccess,
    private getTravelRoute: IUseCase<TravelRouteToFindDTO, TravelRouteFoundDTO>,
    private logger: ILogger
  ) {
    this.inputValidator = /[a-z]-[a-z]/gi
  }

  async execute (): Promise<void> {
    let route = ''

    do {
      route = await this.consoleAccess.ask('Please enter the route on format "ORIGIN-DESTINATION":')
    } while (!this.isValidTravelRoute(route))

    const originAndDestination = route
      .split('-')
      .map(route => route
        .toUpperCase()
        .trim()
      )

    const [origin, destination] = originAndDestination as [Airport, Airport]

    const travelRouteFound = await this.getTravelRoute.execute({ origin, destination })

    this.logger.info('best route: ' + travelRouteFound)

    return this.execute()
  }

  private isValidTravelRoute (route: string): boolean {
    return this.inputValidator.test(route)
  }
}
