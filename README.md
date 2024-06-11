# HigherHelp API

This is the API for HigherHelp, an app for making money as a college student. This API is built with Node.js, Express, and Postgres.

## Getting Started

To get the server running locally:

- Clone this repo
  - `git clone https://github.com/HireU-App/api.git`
  - `cd api`
- `yarn install` to install all required dependencies
- `yarn dev` to start the development server or `yarn start` to start the production server

## Scripts

- `yarn start` to start the local server
- `yarn dev` to start the development server
- `yarn lint` to run ESLint
- `yarn lint:fix` to run ESLint and automatically fix detected issues
- `yarn format` to run Prettier and automatically format your code

## Dependencies

- [express](https://github.com/expressjs/express) - Fast, unopinionated, minimalist web framework for Node.js
- [morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for Node.js
- [winston](https://github.com/winstonjs/winston) - A logger for just about everything
- [lodash-es](https://github.com/lodash/lodash) - A modern JavaScript utility library delivering modularity, performance & extras

## Sample Routes

- `GET /sample` - Welcome message
- `GET /sample/:id` - Get resource with id
- `PATCH /sample/:id` - Update resource with id
- `DELETE /sample/:id` - Delete resource with id
- `GET /sample/user` - User route
- `GET /sample/archived` - Throws an ArchivedError
- `GET /sample/error` - Throws a RequestError
- `GET /sample/auth` - Throws an AuthenticationError

If your server is running locally, you can test these routes by entering the URL in your browser:

- `http://localhost:3001/sample`
- `http://localhost:3001/sample/1`
- `http://localhost:3001/sample/user`
- etc...

### Testing Routes with Postman

You can test these routes using Postman, a popular API client. Here's a basic guide:

1. Download and install Postman from [https://www.postman.com/downloads/](https://www.postman.com/downloads/).
2. Open Postman and click on the '+' button to create a new tab.
3. From the dropdown, select the type of request (GET, POST, PATCH, DELETE) you want to send.
4. Enter the request URL. For example, to test the sample route, you would enter `http://localhost:3001/sample`.
5. If the request type is POST or PATCH, click on the 'Body' tab. Select 'raw' and 'JSON' from the dropdown menu. Enter the JSON data you want to send in the request.
6. Click on the 'Send' button to send the request.
7. The response will be displayed in the section below.

Remember to start your server before sending requests. If your server is not running, Postman will not be able to reach the routes and you will receive a 'Could not get any response' error.
