# Node.js REST Posts

_the goal of this readme is to summarize the project, not to provide a classical REST Api documentation_

<br/>

This node application is a basic REST Api Server built with Express. It is part of [this Udemy Course](https://www.udemy.com/course/nodejs-the-complete-guide/). It provides endpoints for authentication (supported by JWT) and posts management (e.g. retrieval, creation, editing and deletion). The server also opens a `socket.io` connection that emits different posts events.

## General Info

- The project follows the MC (Model-Controller) pattern, with a structure organized around two areas: _auth_ and _feed_ (e.g. user authentication and posts management)
- Domain object models _User_ and _Post_ interface with noSQL database MongoDB.
  - Every user has multiple posts and every post belongs to one user
- Two authentication POST endpoints: `/auth/signup` and `auth/login`
  - The login response carries a JWT token valid for 1h
- Multiple posts endpoints which are all 'guarded' by the custom `isAuth` middleware that checks the existence and validity of the JWT
  - All feed routes are prefixed with `/feed`
  - GET `/posts`, `/post/:postId` and `/status`
  - POST `/post`
  - PUT and DELETE `/post/:id`
- A `socket.io` connection is initialized with the listening Express server and emits the event `posts` with one of the actions `create`, `update` or `delete`, whenever one of the corresponding REST endpoints is hit
  - e.g. it can be listened on the client for live updates
- Post images are stored on the server and image paths on the database
