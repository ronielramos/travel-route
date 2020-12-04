import { InMemoryGraph } from '../aggregates/entities/graph/InMemoryGraph'
import { IGraph } from '../aggregates/entities/graph/IGraph'
import BestTravelRoute from '../root/BestTravelRoute'
import { IBestTravelRoute } from '../root/IBestTravelRoute'
import { IPath } from '../aggregates/services/path/IPath'
import { InMemoryPath } from '../aggregates/services/path/InMemoryPath'

export class BestTravelRouteFactory {
  makeBestTravelRoute (): IBestTravelRoute {
    const graph: IGraph = new InMemoryGraph()
    const path: IPath = new InMemoryPath()
    const bestTravelRoute: IBestTravelRoute = new BestTravelRoute(graph, path)

    return bestTravelRoute
  }
}
