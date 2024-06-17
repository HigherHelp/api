import express from 'express';
import prisma from '../tools/prisma.js';
import {
  ArchivedError,
  RequestError,
  AuthenticationError,
} from '../constants/commonErrors.js';

const router = express.Router();

//welcomes users
router.get('/', (request, response) => {
  response.json({ message: 'Welcome!' });
});

router.get('/archived', () => {
  throw new ArchivedError('This user has been archived');
});

router.get('/error', () => {
  throw new RequestError('Request Error');
});

router.get('/auth', () => {
  throw new AuthenticationError('Authentication Error');
});

//gets a user from id
router.get('/:id', async (request, response, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: request.params.id,
      },
    });
    if (!user) {
      throw new RequestError('User not found with ID');
    }
    response.json({ user });
  } catch (error) {
    next(error);
    return;
  }
});

//update user by id
router.patch('/:id', async (request, response, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: request.params.id,
      },
    });
    if (!user) {
      throw new RequestError('User not found with ID');
    }
    //const updateName =
    await prisma.user.update({
      where: {
        id: request.params.id,
      },
      data: {
        name: request.body.name,
      },
    });
    response.json({ message: 'updated' });

    //const updateEmail =
    await prisma.user.update({
      where: {
        id: request.params.id,
      },
      data: {
        email: request.body.email,
      },
    });
  } catch (error) {
    next(error);
    return;
  }
});

router.delete('/:id', async (request, response, next) => {
  try {
    const testUser = await prisma.user.findUnique({
      where: {
        id: request.params.id,
      },
    });
    if (!testUser) {
      throw new RequestError('User not found with ID');
    }
    //const user =
    await prisma.user.delete({
      where: {
        id: request.params.id,
      },
    });
    response.json({ message: 'deletion successful' });
  } catch (error) {
    next(error);
    return;
  }
});

export default router;
