import chai, { should } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import path from 'path'

import { fileAccess } from '../../../../shared/providers/file-access'
import { BestTravelRouteError } from '../../domain/errors/BestTravelRoute.error'
import { BestTravelRouteFactory } from '../../domain/factories/BestTravelRoute.factory'
import { ITravelRouteRepository } from '../../domain/ITravelRoute.repository'
import { TravelRouteFoundDTO, TravelRouteToFindDTO } from '../../dtos/GetTravelRoute.dto'
import TravelRouteRepository from '../../infra/database/repositories/TravelRoute.repository'
import { IUseCase } from '../IUseCase'
import GetBestTravelRouteUseCase from './GetBestTravelRoute.useCase'

describe('INTEGRATION | GetBestTravelRoute', () => {
  let travelRouteRepository: ITravelRouteRepository
  let getBestTravelRouteUseCase: IUseCase<TravelRouteToFindDTO, TravelRouteFoundDTO>
  let sourceOfPathToFile: string
  let pathToFile: string

  before(() => {
    should()
    chai.use(chaiAsPromised)
  })

  beforeEach(async () => {
    const bestTravelRouteFactory = new BestTravelRouteFactory()

    const pathToSourceFileName = 'bd9314ae-1b54-4fc4-96bb-eaf1dfa5fb4a.txt'
    sourceOfPathToFile = path.join('cache', 'test', pathToSourceFileName)

    const sourceFileName = '57125b23-3e75-4d72-844a-b7155d0a0860.txt'
    pathToFile = path.join('cache', 'test', sourceFileName)

    await fileAccess.write(sourceOfPathToFile, pathToFile)

    travelRouteRepository = new TravelRouteRepository(fileAccess)

    await travelRouteRepository.initialize(sourceOfPathToFile)

    await travelRouteRepository.create({
      origin: 'GRU',
      destination: 'BRC',
      price: 10
    })

    getBestTravelRouteUseCase = new GetBestTravelRouteUseCase(
      bestTravelRouteFactory,
      travelRouteRepository
    )
  })

  context('When I have to return the best price for a route', () => {
    it('Should find the best path for route GRU-BRC', async () => {
      const route = await getBestTravelRouteUseCase.execute({ origin: 'GRU', destination: 'BRC' })
      route.should.be.equal('GRU - BRC > $10')
    })

    it('Should not find any route to an invalid route origin', () => {
      return getBestTravelRouteUseCase.execute({
        origin: '75659fb2-710d-497e-81e2-b63428076b76',
        destination: 'BRC'
      })
        .should
        .be
        .rejectedWith(BestTravelRouteError)
    })

    afterEach(async () => {
      const promisesToDeleteFiles = [pathToFile, sourceOfPathToFile].map(path => fileAccess.remove(path))

      await Promise.all(promisesToDeleteFiles)
    })
  })
})
