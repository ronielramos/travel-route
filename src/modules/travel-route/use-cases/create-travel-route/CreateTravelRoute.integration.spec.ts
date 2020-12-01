import { should } from 'chai'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import { fileAccess } from '../../../../shared/providers/file-access'
import TravelRouteRepository from '../../infra/database/implementations/TravelRoute.repository'
import { ITravelRouteRepository } from '../../infra/database/ITravelRoute.repository'
import CreateTravelRoute from './CreateTravelRoute'

describe('INTEGRATION | CreateTravelRoute', () => {
  let travelRouteRepository: ITravelRouteRepository

  let readFile: (file: string) => Promise<Buffer>
  let deleteFile: (file: string) => Promise<void>
  let writeFile: (file: string, data: string) => Promise<void>

  let sourceOfPathToFile: string
  let pathToFile: string

  before(async () => {
    should()

    readFile = promisify(fs.readFile)
    writeFile = promisify(fs.writeFile)
    deleteFile = promisify(fs.unlink)
  })

  beforeEach(async () => {
    sourceOfPathToFile = path.join(
      'cache',
      'test',
      'ebc1a29a-2a1c-402e-9b64-be6456e83147-CreateTravelRouteIntegration.source.txt'
    )

    pathToFile = path.join(
      'cache',
      'test',
      '0e2810b9-dd7e-4c7d-86a2-7d29b94a14b3-CreateTravelRouteIntegration.file.txt'
    )

    await writeFile(sourceOfPathToFile, pathToFile)

    travelRouteRepository = new TravelRouteRepository(fileAccess)
    await travelRouteRepository.initialize(sourceOfPathToFile)
  })

  context('When I have to create a new route using a file repository', () => {
    it('Should persist one route on a file', async () => {
      const createTravelRoute = new CreateTravelRoute(travelRouteRepository)

      await createTravelRoute.execute({ routeName: 'GRU-GDO', routePrice: 200 })

      const routesBuffer = await readFile(pathToFile)
      const routes = routesBuffer
        .toString()
        .split('\n')
        .filter(route => route !== '')

      routes.should.have.lengthOf(1)
    })

    it('Should persist two routes on a file', async () => {
      const createTravelRoute = new CreateTravelRoute(travelRouteRepository)

      await createTravelRoute.execute({ routeName: 'GRU-SCL', routePrice: 1_000 })
      await createTravelRoute.execute({ routeName: 'SCL-GRU', routePrice: 500 })

      const routesBuffer = await readFile(pathToFile)
      const routes = routesBuffer
        .toString()
        .split('\n')
        .filter(route => route !== '')

      routes.should.have.lengthOf(2)
    })
  })

  afterEach(async () => {
    const promisesToDeleteFiles = [pathToFile, sourceOfPathToFile].map(path => deleteFile(path))

    await Promise.all(promisesToDeleteFiles)
  })
})
