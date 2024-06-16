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

//gets a user from id
router.get('/:id', async (request, response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: request.params.id,
    },
  });
  response.json({ user });
});

//update user by id
router.patch('/:id', async (request, response) => {
  const check = request.params.id.split('-');
  if (
    check.length != 5 ||
    check[0].length != 8 ||
    check[1].length != 4 ||
    check[2].length != 4 ||
    check[3].length != 4 ||
    check[4].length != 12
  ) {
    throw new RequestError('Invalid ID');
  }
  const user = await prisma.user.findFirst({
    where: {
      id: request.params.id,
    },
  });

  if (!user) {
    throw new RequestError('User not found with id');
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
});

router.delete('/:id', async (request, response) => {
  //const user =
  await prisma.user.delete({
    where: {
      id: request.params.id,
    },
  });
  response.json({ message: 'deletion successful' });
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

export default router;
