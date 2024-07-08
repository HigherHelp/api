import _ from 'lodash';

export default async (request, response, next) => {
  let route = request.path;
  if (_.last(route) === '/') {
    route = route.slice(0, -1);
  }

  let publicRoutes = [];
  try {
    publicRoutes = process.env.PUBLIC_ROUTES?.split(',') || [];
  } catch (error) {
    console.error('Error parsing PUBLIC_ROUTES:', error);
  }

  request.isPublicRoute =
    publicRoutes.includes('*') || publicRoutes.includes(route);
  next();
};
