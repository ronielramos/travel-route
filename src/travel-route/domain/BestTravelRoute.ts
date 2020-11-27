import { ITravelRouteRepository } from '../infra/database/ITravelRoute.repository'
import TravelRouteDTO from '../dtos/TravelRoute.dto'

/**
 * Business Rules
 * - Get the best price route independent of the quantity of routes
 * - If dont have a route, return error
 */

export default class BestTravelRoute {
  private travelRoutes: TravelRouteDTO[]

  constructor (private bestTravelRepository: ITravelRouteRepository) {
    this.travelRoutes = []
    this.initialize()
  }

  private async initialize () {
    this.travelRoutes = await this.bestTravelRepository.getAll()
  }

  private calculate (origin: string, destiny: string) {
    throw new Error('NOT IMPLEMENTED')
  }

  find (origin: string, destiny: string): string {
    throw new Error('NOT IMPLEMENTED')
  }
}
