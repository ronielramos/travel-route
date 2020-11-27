# The Best Route

## How to start

### Production version

```text
npm install

npm start:prod
```

### Development version

```text
npm install

npm run start:dev
```

### Tests

```text
npm install

npm run test:unit
npm run test:integration

npm run test // Run all tests
```

## Command Line API

Input

```text
npm start:prod input-route.csv
```

Output

```json
input-route.csv loaded
starting server at port: XXXX
```

On error

```json
Ops! Input routes are not provided, please follow de steps describe on README.md to initialize project!
```

## API REST

### POST /v1/routes - Creates a new route

Input:

```json
{
  "routeName": "GRU",
  "routePrice": 50
}
```

* routePrice is in dollar

Output:

```json
{
  "routeName": "GRU",
  "routePrice": 50
}
```

* 201 - Sucess
* 400 - Invalid parameter error
* 500 - Internal error

### GET /v1/routes/best-price - Return the best route

Input

```json
{
  "origin": "",
  "destiny": ""
}
```

Output

```json
{
  "bestRoutePerPrice": "GRU - BRC - SCL - ORL - CDG"
}
```

* 200 - Sucess
* 400 - Invalid parameter error
* 500 - Internal error
