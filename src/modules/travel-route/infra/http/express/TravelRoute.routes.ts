import Router from 'express'
import TravelRouteController from './TravelRoute.controller'
import CreateTravelRoute from '../../../use-cases/CreateTravelRoute'
import GetBestTravelRoute from '../../../use-cases/GetBestTravelRoute'

const travelRouteRouter = Router()

const createTravelRoute = new CreateTravelRoute()
const getBestTravelRoute = new GetBestTravelRoute()

const travelRouteController = new TravelRouteController(
  createTravelRoute,
  getBestTravelRoute
)

travelRouteRouter.post('/', travelRouteController.create.bind(travelRouteController))
travelRouteRouter.post('/priceless', travelRouteController.getOne.bind(travelRouteController))

export default travelRouteRouter
