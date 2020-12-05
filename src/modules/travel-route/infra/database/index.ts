import { fileAccess } from '../../../../shared/providers/file-access'
import TravelRouteRepository from './repositories/TravelRoute.repository'
import { INITIAL_DATA_SOURCE_ADDRESS } from './shared-data/repository.shared-data'

const travelRouteRepository = new TravelRouteRepository(fileAccess)

travelRouteRepository
  .initialize(INITIAL_DATA_SOURCE_ADDRESS)

export { travelRouteRepository }
