import CreateTravelRoute from './CreateTravelRoute'
import chai, { expect, should } from 'chai'
import TravelRouteRepository from '../../infra/database/file/TravelRoute.repository'
import chaiAsPromised from 'chai-as-promised'
import { promisify } from 'util'
import fs from 'fs'

describe('INTEGRATION | CreateTravelRoute', () => {
  let pathToFile: ['cache', 'test']
  let fileNames: [
    'input-routes-1.csv',
    'input-routes-2.csv'
  ]

  before(() => {
    pathToFile = ['cache', 'test']
    fileNames = ['input-routes-1.csv', 'input-routes-2.csv']

    chai.use(chaiAsPromised)

    should()
  })

  context('When I have to create a new route using a file repository', () => {
    it('Should persist one route on a file', async () => {
      const travelRouteRepository = new TravelRouteRepository(pathToFile, fileNames[0])
      const createTravelRoute = new CreateTravelRoute(travelRouteRepository)

      return expect(createTravelRoute.execute({ routeName: 'GRU-SCL', routePrice: 500 }))
        .to
        .be
        .fulfilled
    })

    it('Should persist two routes on a file', async () => {
      const travelRouteRepository = new TravelRouteRepository(pathToFile, fileNames[1])
      const createTravelRoute = new CreateTravelRoute(travelRouteRepository)

      await createTravelRoute.execute({
        routeName: 'GRU-SCL',
        routePrice: 1_000
      })

      return expect(createTravelRoute.execute({ routeName: 'SCL-GRU', routePrice: 500 }))
        .to
        .be
        .fulfilled
    })
  })

  after(async () => {
    const deleteFile = promisify(fs.unlink)

    const promisesToDeleteFiles = pathToFile.map(path => deleteFile(path))

    await Promise.all(promisesToDeleteFiles)
  })
})
