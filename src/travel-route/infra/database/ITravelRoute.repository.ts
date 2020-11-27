export interface ITravelRouteRepository {
  getAll(): Promise<{ routeName: string, routePrice: number } []>
  create(route: { routeName: string, routePrice: number }): Promise<void>
}
