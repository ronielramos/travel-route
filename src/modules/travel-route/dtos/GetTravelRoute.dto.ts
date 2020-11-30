/**
 * @example
 *  output = {
 *    origin: 'GRU',
 *    destination: 'BRC'
 * }
 */
export type TravelRouteToFindDTO = {
  origin: string
  destination: string
}

/**
 * @example 'GRU - BRC - SCL - ORL - CDG > $40'
 */
export type TravelRouteFoundDTO = string
