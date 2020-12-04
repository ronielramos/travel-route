import { should } from 'chai'

import { Dollar } from '../BestTravelRoute'
import { BestTravelRouteFactory } from '../factories/BestTravelRouteFactory'
import { IBestTravelRoute } from './IBestTravelRoute'
import { BestTravelRouteError } from '../errors/BestTravelRouteError'

type AirportsAvailableForTest = 'GRU' |'BRC' |'ORL' |'SCL' |'CDG'

type TravelRouteForTest = {
  origin: AirportsAvailableForTest,
  destination: AirportsAvailableForTest
}

describe('UNIT | BestTravelRoute', () => {
  let travelRoutes: (TravelRouteForTest & { price: Dollar })[]

  let bestTravelRoute: IBestTravelRoute

  before(() => {
    should()
  })

  beforeEach(() => {
    const bestTravelRouteFactory = new BestTravelRouteFactory()
    bestTravelRoute = bestTravelRouteFactory.makeBestTravelRoute()

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

      it('BRC-GRU', () => {
        const travelRoute: TravelRouteForTest = { origin: 'BRC', destination: 'GRU' }
        const route = bestTravelRoute.find(travelRoute, travelRoutes)

        route.should.be.equal('BRC - GRU > $100')
      })
    })

    describe('Should not find any path for routes who does not have connections between origin and destination', () => {
      it('CDG-GRU', () => {
        const travelRoute: TravelRouteForTest = { origin: 'CDG', destination: 'GRU' }
        ;(() => bestTravelRoute.find(travelRoute, travelRoutes))
          .should
          .throw(BestTravelRouteError)
      })

      it('ORL-BRC', () => {
        const travelRoute: TravelRouteForTest = { origin: 'ORL', destination: 'BRC' }
        ;(() => bestTravelRoute.find(travelRoute, travelRoutes))
          .should
          .throw(BestTravelRouteError)
      })
    })

    describe('Should not find any path for non saved route', () => {
      it('NNN-SSS', () => {
        const travelRoute = { origin: 'NNN', destination: 'SSS' }
        ;(() => bestTravelRoute.find(travelRoute, travelRoutes))
          .should
          .throw(BestTravelRouteError)
      })

      it('NNN-GRU', () => {
        const travelRoute = { origin: 'NNN', destination: 'GRU' }
        ;(() => bestTravelRoute.find(travelRoute, travelRoutes))
          .should
          .throw(BestTravelRouteError)
      })

      it('GRU-SSS', () => {
        const travelRoute = { origin: 'GRU', destination: 'SSS' }

        ;(() => bestTravelRoute.find(travelRoute, travelRoutes))
          .should
          .throw(BestTravelRouteError)
      })
    })
  })
})
