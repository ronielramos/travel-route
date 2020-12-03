import { fileAccess } from '../../../../shared/providers/file-access'
import TravelRouteRepository from './implementations/TravelRoute.repository'
import { INITIAL_DATA_SOURCE_ADDRESS } from './utils/initial-data-source-name'

const travelRouteRepository = new TravelRouteRepository(fileAccess)

travelRouteRepository
  .initialize(INITIAL_DATA_SOURCE_ADDRESS)

export { travelRouteRepository }
