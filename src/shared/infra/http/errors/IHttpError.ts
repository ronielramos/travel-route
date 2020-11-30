export interface HttpError extends Error {
  readonly statusCode: number
}
