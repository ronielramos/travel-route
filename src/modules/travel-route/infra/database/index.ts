import { fileAccess } from '../../../../shared/providers/file-access'
import TravelRouteRepository from './implementations/TravelRoute.repository'
import { FileToPersist } from './utils/file.enum'

export const travelRouteRepository = new TravelRouteRepository(fileAccess, FileToPersist.file)
