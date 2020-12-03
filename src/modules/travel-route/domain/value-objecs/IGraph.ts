import { CreatedTravelRouteDTO } from '../../dtos/CreateTravelRoute.dto'
import { Airport, Node, Edge } from '../domain'

export interface IGraph {
  createEdges (origin: Airport, travelRoutes: CreatedTravelRouteDTO[]): IGraph
  createNodes (airports: Set<Airport>): IGraph
  getOneNode (name: string): Node
  findBestEdge (destination: Airport): Edge | undefined
}
