## kurangguru-backend
This is a ExpressJs-based API for [frontend project](https://github.com/MemorableTeam/kurangguru-frontend.git). It uses PostgreSQL as its database

## Getting started

To get the Node server running locally:

* Clone this repo with `git clone https://github.com/MemorableTeam/kurangguru-backend.git`
* `cd kurangguru-backend`
* `npm install` to install all required dependencies
* Create a `.env` file and reference the `.env.example` file
* `node index.js` to start the local server

## Database
Open [database](https://drive.google.com/file/d/1ZgjPSZA6d_1-LZnM1kTmspUnGlLcN5gV/view?usp=sharing) and the [schema](https://drawsql.app/dea/diagrams/Kurangguru)

## Folder Structure

    ├── controllers                    
    │   ├── auth.js              
    │   ├── class.js              
    │   ├── member.js             
    │   ├── setup.js
    |   ├── topics.js
    |   └── users.js
    ├── helpers
    │   ├── connection.js
    │   ├── fromResponse.js              
    │   ├── hashing.js             
    │   ├── queryAuth.js
    |   ├── queryClass.js
    |   ├── queryMember.js
    |   ├── queryTopics.js
    |   ├── queryUser.js
    |   ├── sendMail.js
    |   ├── upload.js
    |   └── verifyToken.js
    ├── models
    │   ├── auth.js              
    │   ├── class.js              
    │   ├── member.js             
    │   ├── setup.js
    |   ├── topics.js
    |   └── users.js
    ├── routes
    │   ├── auth.js              
    │   ├── class.js
    │   ├── index.js
    │   ├── member.js             
    │   ├── setup.js
    |   ├── topics.js
    |   └── users.js
    └── app.js
    
## Endpoints
auth endpoint

    POST      /auth
    POST      /auth/login
    POST      /auth/register
    POST      /auth/register/email-vreify
    POST      /auth/forgot-password
    POST      /auth/forgot-password/email-verify
    POST      /auth/change-password

class endpoint

    GET      /class
    GET      /class/all
    GET      /class/user
    POST     /class
    PATCH    /class
    
member endpoint

    GET       /member/
    GET       /member/1
    POST      /member/add
    DELETE    /member/delete/1
    
topics endpoint

    GET      /topics
    POST     /topics
    PATCH    /topics
    DEL      /topics
    
user endpoint

    GET      /users
    PATCH    /users
    
when put under a domain with `prefix`, it would look like:

    https://www.example.com/kurangguru/api/users
