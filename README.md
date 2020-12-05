# The Best Route

## Important

* Dijkstra is the algorithm what inspires the search solution
* file what will be used as the database must be on "root" directory of the project
* route price is in dollar

## Requirements

* NodeJS 12+

## How to start

### Before all

```text
npm install
npm run build // for production
```

### Console Interface

```text
// To initialize the database

// for development
npm run dev:init

// for production
npm run start:init

Should present: insert filename with the list of travel routes: // insert filename here

On success: Finished!
```

```text
// To execute travel route searcher

// for production
npm run start:console

// for development
// npm run dev:console

Should present: Please enter the route on format "ORIGIN-DESTINATION": // insert route here

On sucess: best route: XXX - XXX > $10
On error: Ops, this route was not found!
```

### API Rest Interface

```text
// for production
npm run start:http
```

```text
// for development
npm run dev:http
```

### Possible status codes

* 201 - Sucess
* 400 - Invalid parameter error
* 500 - Internal error

### Routes

#### POST /v1/travel-route - Creates a new route

Input:

```JSON
{
  "routeName": "GRU-CDG",
  "routePrice": 50
}
```

Output on success (status code 200)

```JSON
{
  "origin": "GRU",
  "destination": "CDG",
  "price": 50
}
```

Output on invalid param (status code 400)

```JSON
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

```JSON
{
  "message": "Internal Server Error",
}
```

#### GET /v1/travel-route/ORL-SCL/priceless - Return the best route

Output on success (status code 200)

```JSON
{
  "bestTravelFound": "GRU - BRC - SCL - ORL - CDG"
}
```

Output on invalid param (status code 400)

```JSON
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

Output on the error to find travel route (status code 400)

```JSON
{
  "message": "message"
}
```

Output on server error (status code 500)

```JSON
{
  "message": "Internal Server Error",
}
```

### Tests

* Most focused on domain to guarantee the most important
* .unit.spec to unit test and .integration.spec for integration tests

```text
// How to run

npm install
npm run test:unit
npm run test:integration

npm run test // for all tests
npm run test:coverage // for all tests and generate coverage report
```

## Conventions

### Lint

* eslint with [standard](https://standardjs.com) rules

### Folders

* kebab-case for all folders

### Files

* PascalCase for files with an exported class, interface, or type definitions
* Filename with ".d" means that file have definitions
* Filename with the initial "I" mean that file have an interface
* camelCase for files with an exported function
* Filename using the pattern name.typeCamelCase.ts
* Tests using the pattern name.type-of-test.spec.ts

## Architecture Overview

### Introduction

The architecture has been inspired by Clean Architecture and DDD concepts. This choice considers we have a well-defined domain, the algorithm what will find routes, many possibilities to interact with this application, console and HTTP rest API, and we have many possible solutions to improve the implementation with external services, like a graph-based database. With that, this choice makes it possible to grow and change implementations more easily.

### Layers explained

* Presenters/Controllers/Gateways - infra and provider's folder
* Use cases - use-cases folder
* Entities - domain folder

### First level

That level contains the separation of modules and shared, to clarify what can be, for any module, used and what has a specific logic

```text
|-- src
|---- modules
|---- shared
```

### Second Level

modules - We have our first module called "travel-route" which will contain the specific logic
shared - We have the separation of two concepts, infra, and providers. Providers give me some external feature access, and infra, access to any external resource or allow external access to our application.

```text
|-- src
|---- modules
|------ travel-route
|---- shared
|------ infra
|------ providers
```

### Third Level

travel-route - Used concepts of DDD to design this module:

* domain contains the most important, the enterprise business logic
* use cases have the responsibility to orchestrate the implementation of  application business logic
* infra should contain all logic responsible for external access to this module or vice versa
* dtos are responsible for what will be sent or received on communication between layers

```text
|-- src
|---- modules
|------ travel-route
|-------- domain
|-------- dtos
|-------- infra
|-------- use-cases
|---- shared
|------ infra
|-------- console
|-------- http
|-------- logger
|------ providers
|-------- console-access
|-------- file-access
```

### Domain

* entities/graph - contain an implementation of the Graph Structure what will be used by the root
* services/path - have an implementation of the algorithm what find the best route between the all found
* root - have the responsibility to implements the algorithm used on the search for the route with the best price
* factories - used to create a domain root instance with services and entities injected

```text
|-- src
|---- modules
|------ travel-route
|-------- domain
|---------- aggregates
|------------ entities
|-------------- graph
|------------ services
|-------------- path
|---------- errors
|---------- factories
|---------- root

```
