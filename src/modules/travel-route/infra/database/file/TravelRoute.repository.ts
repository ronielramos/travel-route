import { CreatedTravelRouteDTO, TravelRouteToCreateDTO } from '../../../dtos/CreateTravelRoute.dto'
import { ITravelRouteRepository } from '../ITravelRoute.repository'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

export default class TravelRouteRepository implements ITravelRouteRepository {
  private readonly fileAddress: string

  private readonly readFile: (pathToFile: string) => Promise<Buffer>
  private readonly writeFile: (pathToFile: string, data: string | Buffer) => Promise<void>

  constructor (
    private readonly pathToFile: string[],
    private readonly fileName: string
  ) {
    this.readFile = promisify(fs.readFile)
    this.writeFile = promisify(fs.writeFile)

    this.fileAddress = path.join(...this.pathToFile, this.fileName)
  }

  async initialize (initialFile: string) {
    const writeStream = fs.createWriteStream(this.fileAddress)
    const readStream = fs.createReadStream(initialFile)

    return new Promise<void>((resolve, reject) => {
      readStream
        .pipe(writeStream)
        .on('finish', () => resolve())
        .on('error', (error) => reject(error))
    })
  }

  async create (data: TravelRouteToCreateDTO): Promise<CreatedTravelRouteDTO> {
    const [origin, destination] = data.routeName.split('-') as [string, string]
    const routeToSaveOnFile = `${origin},${destination},${data.routePrice}`

    await this.writeFile(this.fileAddress, routeToSaveOnFile)

    return {
      origin,
      destination,
      price: data.routePrice
    }
  }

  async getAll (): Promise<CreatedTravelRouteDTO[]> {
    const text = await this.readFile(this.fileAddress)

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
