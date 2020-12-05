import { Airport } from '../../../BestTravelRoute'
import { Edge } from '../../entities/graph/Graph'
import { IPath } from './IPath'

export class InMemoryPath implements IPath {
  private paths: Edge[][]

  constructor () {
    this.paths = []
  }

  addEdgeOnPath (selectedEdge: Edge): void {
    let createNewPath = true

    this.paths.forEach((edges) => {
      const lastIndexOnEdge = (edges.length - 1)
      const lastEdge = edges[lastIndexOnEdge]

      const edgeFoundOnSamePath = !!lastEdge && (lastEdge.destination === selectedEdge.origin)
      if (edgeFoundOnSamePath) {
        edges.push(selectedEdge)
        createNewPath = false
      }

      const edgeFoundOnDifferentPath = !!lastEdge && lastEdge.origin === selectedEdge.origin
      if (edgeFoundOnDifferentPath) {
        const edgesCrossedToArriveLastEdge = edges.length > 1
          ? edges.filter((_edge, index) => index <= (lastIndexOnEdge - 1))
          : []

        this.paths.push([...edgesCrossedToArriveLastEdge, selectedEdge])
        createNewPath = false
      }
    })

    if (createNewPath) this.paths.push([selectedEdge])
  }

  findBestPath (destination: Airport): string {
    const pathFound = this.paths
      .filter(path => !!path.find(edge => edge.destination.name === destination))
      .map(path => {
        const lastIndex = path.length - 1
        const pathPrice = path[lastIndex]?.price ?? 0

        return {
          path,
          price: pathPrice
        }
      })
      .sort((pathA, pathB) => pathA.price - pathB.price)
      .pop()

    const completeRoute = pathFound?.path
      .map(path => path.destination.name)
      .reduce((prev, curr) => `${prev} - ${curr}`)

    return (completeRoute && pathFound?.price) ? `${completeRoute} > $${pathFound.price}` : ''
  }
}
