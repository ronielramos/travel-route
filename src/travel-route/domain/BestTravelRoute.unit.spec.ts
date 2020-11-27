import { expect } from 'chai'

import FakeTravelRouteRepository from '../infra/database/file/FakeTravelRoute.repository'
import { ITravelRouteRepository } from '../infra/database/ITravelRoute.repository'
import BestTravelRoute from './BestTravelRoute'

/**
 * NODES:
 * GRU
 * BRC
 * SCL
 * ORL
 * CDG
*/

describe('UNIT | RoutePrice', () => {
  let travelRouteRepository: ITravelRouteRepository

  beforeEach(() => {
    travelRouteRepository = new FakeTravelRouteRepository()
  })

  context('When i have to calculate the best price for a route', () => {
    it('Should search the lowest price route for GRU-CGD', () => {
      const routeLowestPrice = new BestTravelRoute(travelRouteRepository)

      const route = routeLowestPrice.find('GRU', 'CGD')

      expect(route).to.be.equal('GRU - BRC - SCL - ORL - CDG')
    })

    it('Should search the lowest price route for GRU-ORL', () => {
      const routeLowestPrice = new BestTravelRoute(travelRouteRepository)

      const route = routeLowestPrice.find('GRU', 'ORL')

      expect(route).to.be.equal('GRU - BRC - SCL - ORL')
    })
  })
})
