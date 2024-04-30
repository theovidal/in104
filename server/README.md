# API server

This folder contains the Back-End of our application, which consists of a REST API.

Every API request must contain the user token in the `Authentication` header, except for the login route (obviously).

## Routes

### User management

- `POST` login : action of logging in using email and password ; include in the body :
  - email
  - password
- `GET` profile : get all the information of the user (assuming they're authenticated)

### Interaction with courses

- `POST` create-code : action for teachers to create a code for a certain course
- `POST` scan-code : action for pupils to mark their presence at a certain lecture, given a code

### Data fetch for dashboard

- `GET` my-presences : for a pupil, get all the presences (or not)
- `GET` my-lectures : for a teacher, get all the lectures they are hosting
- `GET` presence-report : for the administration, get a full report of the presences

## Code structure

- `/core` : snippets to set up and run the app
- `/routes` : all the routes served by the API
  - Format : `path`.`method`.js, method = get or post
  - Every file is automatically imported by the app and integrated as an API route
- `/middlewares` : functions executed before the main route function to add features (cookies, error handling, logging...)
- `/tests` : unit tests for API routes

## Snippets

### Route snippet

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
  res.status(400).json({
    error: 'error message for the user'
  })
}
```
