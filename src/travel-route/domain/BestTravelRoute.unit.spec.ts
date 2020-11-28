import { should } from 'chai'

import GetTravelRouteDTO from '../dtos/GetTravelRoute.dto'
import BestTravelRoute from './BestTravelRoute'

describe('UNIT | BestTravelRoute', () => {
  let travelRoutes: GetTravelRouteDTO[]

  before(() => {
    should()
  })

  beforeEach(async () => {
    travelRoutes = [
      { origin: 'GRU', destination: 'BRC', price: 10 },
      { origin: 'BRC', destination: 'SCL', price: 5 },
      { origin: 'GRU', destination: 'CDG', price: 75 },
      { origin: 'GRU', destination: 'SCL', price: 20 },
      { origin: 'GRU', destination: 'ORL', price: 56 },
      { origin: 'ORL', destination: 'CDG', price: 5 },
      { origin: 'SCL', destination: 'ORL', price: 20 },

      { origin: 'BRC', destination: 'GRU', price: 20 },
      { origin: 'BRC', destination: 'CDG', price: 20 }
    ]
  })

  context('When i have to calculate the best price for a travel route', () => {
    it('Should search route for GRU-CGD', () => {
      const bestTravelRoute = new BestTravelRoute()

      const route = bestTravelRoute.find({ origin: 'GRU', destination: 'CDG' }, travelRoutes)

      route.should.be.equal('GRU - BRC - SCL - ORL - CDG')
    })

    it('Should search route for GRU-ORL', () => {
      const bestTravelRoute = new BestTravelRoute()

      const route = bestTravelRoute.find({ origin: 'GRU', destination: 'ORL' }, travelRoutes)

      route.should.be.equal('GRU - BRC - SCL - ORL')
    })

    it('Should search route for BRC-ORL', () => {
      const bestTravelRoute = new BestTravelRoute()

      const route = bestTravelRoute.find({ origin: 'BRC', destination: 'ORL' }, travelRoutes)

      route.should.be.equal('BRC - SCL - ORL')
    })

    it('Should search route for CDG-GRU', () => {
      const bestTravelRoute = new BestTravelRoute()

      const route = bestTravelRoute.find({ origin: 'CDG', destination: 'GRU' }, travelRoutes)

      route.should.be.equal('')
    })

    it('Should search route for ORL-BRC', () => {
      const bestTravelRoute = new BestTravelRoute()

      const route = bestTravelRoute.find({ origin: 'ORL', destination: 'BRC' }, travelRoutes)

      route.should.be.equal('')
    })

    it('Should search route for BRC-CDG', () => {
      const bestTravelRoute = new BestTravelRoute()

      const route = bestTravelRoute.find({ origin: 'BRC', destination: 'CDG' }, travelRoutes)

      route.should.be.equal('BRC - CDG')
    })

    it('Should search route for BRC-GRU', () => {
      const bestTravelRoute = new BestTravelRoute()

      const route = bestTravelRoute.find({ origin: 'BRC', destination: 'GRU' }, travelRoutes)

      route.should.be.equal('BRC - GRU')
    })
  })
})
