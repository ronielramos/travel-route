export type TravelRouteToCreateDTO = {
  routeName: string
  routePrice: number
}

/**
 * @example
 *  output = {
 *    origin: 'GRU',
 *    destination: 'BRC'
 *    price: 100
 * }
 */
export type CreatedTravelRouteDTO = {
  origin: string
  destination: string
  price: number
}
