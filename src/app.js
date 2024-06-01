import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import routes from './routes.js';
import morganMiddleware from './middleware/morgan.js';
import errorHandler from './middleware/errorHandler.js';
import publicRoutes from './middleware/publicRoutes.js';

export default express()
  .use(cookieParser())
  .use(compression({ filter: shouldCompress }))
  .use(morganMiddleware)
  .options('*', cors())
  .use(
    cors({
      origin: process.env.CORS_WHITELIST ?? process.env.BASE_URL,
      methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
    })
  )
  .get('/robots.txt', function (request, response) {
    response.type('text/plain');
    response.send('User-agent: *\nDisallow: /');
  })
  .use(helmet())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .get('/', (request, response) => {
    response.status(200).send(`
        <div style="text-align: center">
          <h1>HireU API</h1>
          <p>©${new Date().getFullYear()} HireU</p>
        </div>
      `);
  })
  .use(publicRoutes)
  .use('/', routes)
  .use(errorHandler)
  .use('*', (request, response) => {
    response.status(404).json({
      message: 'Endpoint does not exist',
    });
  });

function shouldCompress(request, response) {
  if (request.headers['x-no-compresponsesion']) {
    // don't compress responses with this request header
    return false;
  }
  return compression.filter(request, response);
}
