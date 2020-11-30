import readline, { Interface } from 'readline'

import { IConsoleController } from '../../../../shared/infra/console/IConsoleController'
import ILogger from '../../../../shared/infra/logger/ILogger'
import { Airport } from '../../domain/BestTravelRoute.d'
import { TravelRouteFoundDTO, TravelRouteToFindDTO } from '../../dtos/GetTravelRoute.dto'
import { IUseCase } from '../../use-cases/IUseCase'

export default class TravelRouteController implements IConsoleController {
  private readLineInterface: Interface
  private inputValidator: RegExp

  constructor (
    private getTravelRoute: IUseCase<TravelRouteToFindDTO, TravelRouteFoundDTO>,
    private logger: ILogger
  ) {
    this.readLineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    this.inputValidator = /[a-z]-[a-z]/gi
  }

  async execute (): Promise<void> {
    let route = ''

    do {
      route = await this.ask('Please enter the route on format "ORIGIN-DESTINATION":')
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

  private ask (question: string): Promise<string> {
    return new Promise<string>((resolve) => {
      this.readLineInterface.question(question, (answer) => resolve(answer))
    })
  }

  private isValidTravelRoute (route: string): boolean {
    return this.inputValidator.test(route)
  }
}
