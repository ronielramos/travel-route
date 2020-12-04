import { Airport, Edge } from '../../../BestTravelRoute'

export interface IPath {
  addEdgeOnPath (selectedEdge: Edge): void
  findBestPath (destination: Airport): string
}
