import { InMemoryGraph } from '../aggregates/entities/graph/InMemory.graph'
import { IGraph } from '../aggregates/entities/graph/IGraph'
import BestTravelRoute from '../root/BestTravelRoute.root'
import { IBestTravelRoute } from '../root/IBestTravelRoute.root'
import { IPath } from '../aggregates/services/path/IPath'
import { InMemoryPath } from '../aggregates/services/path/InMemory.path'

export class BestTravelRouteFactory {
  makeBestTravelRoute (): IBestTravelRoute {
    const graph: IGraph = new InMemoryGraph()
    const path: IPath = new InMemoryPath()
    const bestTravelRoute: IBestTravelRoute = new BestTravelRoute(graph, path)

    return bestTravelRoute
  }
}
