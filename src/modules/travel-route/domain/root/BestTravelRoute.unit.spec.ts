import { should } from 'chai'

import { Dollar } from '../domain'
import { BestTravelRouteFactory } from '../factories/BestTravelRouteFactory'
import BestTravelRoute from './BestTravelRoute'

type AirportsAvailableForTest = 'GRU' |'BRC' |'ORL' |'SCL' |'CDG'

type TravelRouteForTest = {
  origin: AirportsAvailableForTest,
  destination: AirportsAvailableForTest
}

describe('UNIT | BestTravelRoute', () => {
  let travelRoutes: (TravelRouteForTest & { price: Dollar })[]

  let bestTravelRoute: BestTravelRoute

  before(() => {
    should()
  })

  beforeEach(() => {
    bestTravelRoute = BestTravelRouteFactory.create()

    travelRoutes = [
      { origin: 'GRU', destination: 'BRC', price: 10 },
      { origin: 'BRC', destination: 'SCL', price: 5 },
      { origin: 'GRU', destination: 'CDG', price: 75 },
      { origin: 'GRU', destination: 'SCL', price: 20 },
      { origin: 'GRU', destination: 'ORL', price: 56 },
      { origin: 'ORL', destination: 'CDG', price: 5 },
      { origin: 'SCL', destination: 'ORL', price: 20 },

      { origin: 'BRC', destination: 'GRU', price: 100 }
    ]
  })

  context('When I have a route in format ORIGIN-DESTINATION to search the best priced path', () => {
    describe('Should find the best route for following origins and destinations', () => {
      it('GRU-CGD', () => {
        const travelRoute: TravelRouteForTest = { origin: 'GRU', destination: 'CDG' }
        const route = bestTravelRoute.find(travelRoute, travelRoutes)

        route.should.be.equal('GRU - BRC - SCL - ORL - CDG > $40')
      })

      it('GRU-ORL', () => {
        const travelRoute: TravelRouteForTest = { origin: 'GRU', destination: 'ORL' }
        const route = bestTravelRoute.find(travelRoute, travelRoutes)

        route.should.be.equal('GRU - BRC - SCL - ORL > $35')
      })

      it('BRC-ORL', () => {
        const travelRoute: TravelRouteForTest = { origin: 'BRC', destination: 'ORL' }
        const route = bestTravelRoute.find(travelRoute, travelRoutes)

        route.should.be.equal('BRC - SCL - ORL > $25')
      })

      it('CDG-GRU', () => {
        const travelRoute: TravelRouteForTest = { origin: 'CDG', destination: 'GRU' }
        const route = bestTravelRoute.find(travelRoute, travelRoutes)

        route.should.be.equal('')
      })

      it('ORL-BRC', () => {
        const travelRoute: TravelRouteForTest = { origin: 'ORL', destination: 'BRC' }
        const route = bestTravelRoute.find(travelRoute, travelRoutes)

        route.should.be.equal('')
      })

      it('BRC-GRU', () => {
        const travelRoute: TravelRouteForTest = { origin: 'BRC', destination: 'GRU' }
        const route = bestTravelRoute.find(travelRoute, travelRoutes)

        route.should.be.equal('BRC - GRU > $100')
      })
    })
  })
})
