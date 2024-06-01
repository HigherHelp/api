import {
  ArchivedError,
  AuthenticationError,
  RequestError,
} from '../constants/commonErrors.js';
import express from 'express';

const router = express.Router();

router.get('/', (request, response) => {
  response.json({ message: 'Welcome to the sample route!' });
});

router.get('/:id', (request, response) => {
  response.json({
    message: `You requested resource with id: ${request.params.id}`,
  });
});

router.patch('/:id', (request, response) => {
  const { id } = request.params;
  response.json({ message: `You requested to update resource with id: ${id}` });
});

router.delete('/:id', (request, response) => {
  const { id } = request.params;
  response.json({ message: `You requested to delete resource with id: ${id}` });
});

router.get('/user', (request, response) => {
  response.json({ message: 'You requested the user route' });
});

router.get('/archived', () => {
  throw new ArchivedError('This user is archived');
});

router.get('/error', () => {
  throw new RequestError('This is a request error');
});

router.get('/auth', () => {
  throw new AuthenticationError('This is an authentication error');
});

export default router;
