import { Airport, Edge } from '../domain'
import { IPath } from './IPath'

export class Path implements IPath {
  private paths: Edge[][]

  constructor () {
    this.paths = []
  }

  addEdgeOnPath (selectedEdge: Edge): boolean {
    let sorted = false

    this.paths.forEach((edges) => {
      const lastIndexOnEdge = (edges.length - 1)

      const lastEdge = edges[lastIndexOnEdge]

      const edgeIsFound = !!lastEdge && (lastEdge.destination === selectedEdge.origin)

      if (edgeIsFound) {
        edges.push(selectedEdge)
        sorted = true
      }

      if (!!lastEdge && lastEdge.origin === selectedEdge.origin) {
        const othersEdges = edges.length > 1
          ? edges.filter((_edge, index) => index <= (lastIndexOnEdge - 1))
          : []

        this.paths.push([...othersEdges, selectedEdge])
        sorted = true
      }
    })

    if (!sorted) this.paths.push([selectedEdge])
    return sorted
  }

  findBestPath (destination: Airport): string {
    const pathsToDestination = this.paths
      .filter(path => !!path.find(edge => edge.destination.name === destination))
      .map(path => {
        const lastIndex = path.length - 1

        const pathPrice = path[lastIndex]?.price as number

        return {
          path,
          price: pathPrice
        }
      })

    const pathFound = pathsToDestination
      .sort((pathA, pathB) => pathA.price - pathB.price)
      .pop()

    const completeRoute = pathFound?.path
      .map(path => path.destination.name)
      .reduce((prev, curr) => `${prev} - ${curr}`)

    return completeRoute && pathFound?.price
      ? `${completeRoute} > $${pathFound.price}`
      : ''
  }
}
