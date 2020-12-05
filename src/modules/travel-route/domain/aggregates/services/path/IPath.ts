import { Airport } from '../../../BestTravelRoute'
import { Edge } from '../../entities/graph/Graph'

export interface IPath {
  addEdgeOnPath (selectedEdge: Edge): void
  findBestPath (destination: Airport): string
}
