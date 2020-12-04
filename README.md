# The Best Route

## Important

* file what will be used as data source must be on root directory
* route price is in dollar

## Requirements

* NodeJS 12+

## How to start

### Console Interface

```text
// To initialize data source

npm start:init // To choose file

Should present: insert filename with the list of travel routes: // insert filename here

On sucess: Finished!
```

```text
// To execute travel route searcher

npm start:console

Should present: Please enter the route on format "ORIGIN-DESTINATION": // insert route here

On sucess: best route: XXX - XXX > $10
On error: Ops, route was not found!
```

### API Rest Interface

```text
// Setup for production

npm install
npm run build
npm run start:http
```

```text
// Setup for development

npm install
npm run dev:http
```

### Possible status codes

* 201 - Sucess
* 400 - Invalid parameter error
* 500 - Internal error

### Routes

#### POST /v1/travel-route - Creates a new route

Input:

```json
{
  "routeName": "GRU-CDG",
  "routePrice": 50
}
```

Output on sucess (status code 200)

```json
{
  "origin": "GRU",
  "destination": "CDG",
  "price": 50
}
```

Output on invalid param (status code 400)

```json
{
  "statusCode": 400,
  "message": "celebrate request validation failed",
  "validation": {
    "params": {
      "source": "body",
      "keys": ["string"],
      "message": "string"
    }
  }

}
```

Output on server error (status code 500)

```json
{
  "message": "Internal Server Error",
}
```

#### GET /v1/travel-route/ORL-SCL/priceless - Return the best route

Output on sucess (status code 200)

```json
{
  "bestTravelFound": "GRU - BRC - SCL - ORL - CDG"
}
```

Output on invalid param (status code 400)

```json
{
  "statusCode": 400,
  "message": "celebrate request validation failed",
  "validation": {
    "params": {
      "source": "params",
      "keys": ["routeName"],
      "message": "string"
    }
  }

}
```

Output on error to find travel route (status code 400)

```json
{
  "message": "message"
}
```

Output on server error (status code 500)

```json
{
  "message": "Internal Server Error",
}
```

## Arquitechture Overview

```text
|-- src
|---- modules
|------ travel-route
|-------- application
|-------- domain
|-------- dtos
|-------- infra
|-------- use-cases
|---- shared
|------ application
|------ infra
|------ providers



```
