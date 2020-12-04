/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateTravelRouteDTO, TravelRouteToCreateDTO } from '../../../dtos/CreateTravelRoute.dto'
import { ITravelRouteRepository } from '../../../domain/ITravelRoute.repository'

export default class FakeTravelRouteRepository implements ITravelRouteRepository {
  private travelRoutes: CreateTravelRouteDTO[]

  constructor () {
    this.travelRoutes = []
  }

  async initialize (_initialFile: string) {}

  async create ({ origin, destination, price }: CreateTravelRouteDTO): Promise<void> {
    const travelRoute = { destination, origin, price }
    this.travelRoutes.push(travelRoute)
  }

  async getAll (): Promise<CreateTravelRouteDTO[]> {
    return this.travelRoutes
  }
}
