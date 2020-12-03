import { Airport, Edge } from '../domain'

export interface IPath {
  addEdgeOnPath (selectedEdge: Edge): void
  findBestPath (destination: Airport): string
}
