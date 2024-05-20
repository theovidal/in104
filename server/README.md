# API server

This folder contains the Back-End of our application, which consists of a REST API.

The authentication works using JWTs stored in cookies : you just have to create your session and/or refresh it with the routes below, and pass the cookies along your requests (which is handled automatically using popular API software such as Insomnia).

## Routes

### Session

- `GET` session : get all the information of the user (assuming they're authenticated)
- `POST` session : action of logging in using email and password ; include in the body :
  - email
  - password
- `PATCH` session : refresh the session using the refresh token
- `DELETE` session : action of logging out (i.e. destroying the token)

### Lectures

- `GET` lectures : for a teacher, get all the lectures they are hosting

### Codes

- `POST` code : action for teachers to create a code for a certain lecture ; include in the body :
  - cours : id du cours où l'on veut créer un qr code
- `DELETE` code : action for teachers to delete the code, i.e. stopping to take the register ;

### Presences

- `GET` presences : get all the presences (or absences) of the user (if pupil) or everyone (if administration)
- `POST` presences : action for pupils to mark their presence at a certain lecture, given a code
- `DELETE` presences : action for teachers or the administration to manually set a pupil as absent, if the code was scanned even though they weren't in the room ; include in the body :
  - eleveId : ID de l'élève dont on veut retirer la présence
  - lectureId : ID de la séance concernée

## Code structure

- `/core` : snippets to set up and run the app ;
- `/routes` : all the routes served by the API :
  - Format : `path`.`method`.js, method = get, post, patch or delete ;
  - Every file is automatically imported by the app and integrated as an API route.
- `/middlewares` : functions executed before the main route function to add features (cookies, error handling, logging...) ;
- `/tests` : unit tests for API routes.

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
