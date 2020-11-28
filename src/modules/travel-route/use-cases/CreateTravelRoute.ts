import CreateTravelRouteDTO from '../dtos/CreateTravelRoute.dto'

type CreatedRoute = string

export default class CreateTravelRoute {
  async execute (data: CreateTravelRouteDTO): Promise<CreatedRoute> {
    throw new Error('Not Implemented')
  }
}
