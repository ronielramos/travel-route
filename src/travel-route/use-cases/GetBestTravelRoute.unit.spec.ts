import { expect } from 'chai'
import GetBestTravelRoute from './GetBestTravelRoute'

describe('UNIT | GetBestTravelRoute', () => {
  context('When i have to return the best price for a route', () => {
    it('Should call BestTravelRoute find method', () => {
      const bestTravelRoute = new BestTravelRoute(travelRouteRepository)
      const getBestTravelRoute = new GetBestTravelRoute(bestTravelRoute)

      const route = routeLowestPrice.find('GRU', 'CGD')

      expect(route).to.be.equal('GRU - BRC - SCL - ORL - CDG')
    })
  })
})
