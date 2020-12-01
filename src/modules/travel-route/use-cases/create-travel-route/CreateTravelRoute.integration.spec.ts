import chai, { expect, should } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { fileAccess } from '../../../../shared/providers/file-access'
import TravelRouteRepository from '../../infra/database/implementations/TravelRoute.repository'
import { ITravelRouteRepository } from '../../infra/database/ITravelRoute.repository'
import CreateTravelRoute from './CreateTravelRoute'

describe('INTEGRATION | CreateTravelRoute', () => {
  let travelRouteRepository: ITravelRouteRepository

  let pathToFile: string
  let sourceOfPathToFile: string

  before(async () => {
    const write = promisify(fs.writeFile)

    pathToFile = path.join(
      'cache',
      'test',
      '0e2810b9-dd7e-4c7d-86a2-7d29b94a14b3-CreateTravelRouteIntegration.file.txt'
    )

    sourceOfPathToFile = path.join(
      'cache',
      'test',
      'ebc1a29a-2a1c-402e-9b64-be6456e83147-CreateTravelRouteIntegration.source.txt'
    )

    travelRouteRepository = new TravelRouteRepository(fileAccess, sourceOfPathToFile)

    await write(sourceOfPathToFile, pathToFile)

    chai.use(chaiAsPromised)

    should()
  })

  context('When I have to create a new route using a file repository', () => {
    it('Should persist one route on a file', async () => {
      const createTravelRoute = new CreateTravelRoute(travelRouteRepository)

      return expect(createTravelRoute.execute({ routeName: 'GRU-SCL', routePrice: 500 }))
        .to
        .be
        .fulfilled
    })

    it('Should persist two routes on a file', async () => {
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

    const promisesToDeleteFiles = [pathToFile, sourceOfPathToFile].map(path => deleteFile(path))

    await Promise.all(promisesToDeleteFiles)
  })
})
