import { IFileAccess } from '../../../../../../shared/providers/file-access/IFileAccess'
import { CreatedTravelRouteDTO, TravelRouteToCreateDTO } from '../../../../dtos/CreateTravelRoute.dto'
import { ITravelRouteRepository } from '../ITravelRoute.repository'

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

  async create (data: TravelRouteToCreateDTO): Promise<CreatedTravelRouteDTO> {
    if (!this.fileAddress) throw new Error('File to persist data was not provided!')

    const [origin, destination] = data.routeName.split('-') as [string, string]
    const routeToSaveOnFile = `\n${origin},${destination},${data.routePrice}`

    await this.fileAccess.write(this.fileAddress, routeToSaveOnFile)

    return {
      origin,
      destination,
      price: data.routePrice
    }
  }

  async getAll (): Promise<CreatedTravelRouteDTO[]> {
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
