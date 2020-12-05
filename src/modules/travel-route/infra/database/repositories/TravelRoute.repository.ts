import { IFileAccess } from '../../../../../shared/providers/file-access/IFileAccess.provider'
import { ITravelRouteRepository } from '../../../domain/ITravelRoute.repository'
import { CreateTravelRouteDTO } from '../../../dtos/CreateTravelRoute.dto'

export default class TravelRouteRepository implements ITravelRouteRepository {
  private fileAddress?: string

  constructor (
    private fileAccess: IFileAccess
  ) {}

  async initialize (file: string) {
    const fileToPersist = await this.fileAccess.read(file)

    this.fileAddress = fileToPersist
      .toString()
      .split('\n')
      .find(fileName => fileName)
  }

  async create ({ origin, destination, price }: CreateTravelRouteDTO): Promise<void> {
    if (!this.fileAddress) throw new Error('File to persist data was not provided!')

    const routeToSaveOnFile = `\n${origin},${destination},${price}`

    await this.fileAccess.write(this.fileAddress, routeToSaveOnFile)
  }

  async getAll (): Promise<CreateTravelRouteDTO[]> {
    if (!this.fileAddress) throw new Error('File to persist data was not provided!')

    const text = await this.fileAccess.read(this.fileAddress)

    const travelRoutes = text
      .toString()
      .split('\n')
      .map(line => {
        const routeData = line.split(',')

        const origin = routeData[0] ?? ''
        const destination = routeData[1] ?? ''
        const price = parseInt(routeData[2] ?? '') || 0

        return {
          origin,
          destination,
          price
        }
      })

    return travelRoutes
  }
}
