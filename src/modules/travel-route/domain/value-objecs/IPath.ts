import { Airport, Edge } from '../domain'

export interface IPath {
  addEdgeOnPath (selectedEdge: Edge): boolean
  findBestPath (destination: Airport): string
}
