import { should } from 'chai'

import { TravelRouteToCreateDTO } from '../../dtos/CreateTravelRoute.dto'
import FakeTravelRouteRepository from '../../infra/database/implementations/FakeTravelRoute.repository'
import CreateTravelRoute from './CreateTravelRoute'

describe('UNIT | CreateTravelRoute', () => {
  before(() => {
    should()
  })

  context('When I have to create a new route', () => {
    it('Should create a valid route', async () => {
      const travelRouteRepository = new FakeTravelRouteRepository()
      const createTravelRoute = new CreateTravelRoute(travelRouteRepository)

      const travelRouteToCreate: TravelRouteToCreateDTO = {
        routeName: 'A-B',
        routePrice: 1
      }

      const travelRouteCreated = await createTravelRoute.execute(travelRouteToCreate)

      travelRouteCreated
        .should
        .be
        .deep
        .equal({
          origin: 'A',
          destination: 'B',
          price: 1
        })
    })
  })
})
