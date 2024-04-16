# API server

This folder contains the Back-End of our application, which consists of a REST API.

## Routes

### User management

- `POST` login
- `POST` logout
- `GET` profile

### Interaction with classes

- `POST` create-code : for teacher
- `POST` scan-code : for pupils

## Code structure

- `/core` : contains snippets to set up and run the app
- `/routes` : contains all the routes served by the API
  - Format : `path`.`method`.js, method = get or post
  - Every file is automatically imported by the app and integrated as an API route
- `/middlewares` : contains middlewares of the app, i.e. function executed before the main route function to add features (cookies, error handling, logging...)
- `/tests` (TODO) : unit tests for API routes

## Route snippet

Here is the basic skeleton of an API route :

```javascript
module.exports = function routeName(req, res) {
  // Get all user data :
  res.locals.user
  
  // Send some data :
  res.json({
    // ...data
  })
  
  // Acknowledge an action without return data :
  res.status(204).send()
  
  // Send an error :
  res.status(400)
  throw new Error('error message')
}
```

## Development

Install all the required dependencies with your package manager :

```bash
npm i   # Using NPM
yarn i  # Using Yarn
pnpm i  # Using PNPM
```

Create a `.env` file at the root of the folder (so at the same level as `index.js`) and populate it with the values given in the [example .env](./.env.example).

Run the server :

```bash
npm run serve  # Using NPM
yarn serve     # Using Yarn
pnpm serve     # Using PNPM
```
