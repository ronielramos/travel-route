import { CreateTravelRouteDTO } from '../../../../dtos/CreateTravelRoute.dto'
import { Airport, Edge, Node } from '../../../BestTravelRoute'

export interface IGraph {
  createEdges (originNode: Node, travelRoutes: CreateTravelRouteDTO[]): IGraph
  createNodes (airports: Set<Airport>): IGraph
  getOneNode (name: string): Node | undefined
  findBestEdge (destination: Airport): Edge | undefined
}
