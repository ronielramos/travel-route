import BestTravelRoute from '../root/BestTravelRoute'
import { IBestTravelRoute } from '../root/IBestTravelRoute'
import { Graph } from '../value-objecs/Graph'
import { Path } from '../value-objecs/Path'
import { IGraph } from '../value-objecs/IGraph'
import { IPath } from '../value-objecs/IPath'

export class BestTravelRouteFactory {
  makeBestTravelRoute (): IBestTravelRoute {
    const graph: IGraph = new Graph()
    const path: IPath = new Path()
    const bestTravelRoute: IBestTravelRoute = new BestTravelRoute(graph, path)

    return bestTravelRoute
  }
}
