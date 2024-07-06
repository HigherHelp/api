import express from 'express';
import prisma from '../tools/prisma.js';
import { NotFoundError, RequestError } from '../constants/commonErrors.js';
import _ from 'lodash';

const router = express.Router();

router.get('/:id', async (request, response, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: request.params.id,
      },
    });
    if (!user) {
      throw new NotFoundError(`User not found with ID ${request.params.id}`);
    }
    const userAttributes = _.pick(user, [
      'name',
      'email',
      'createdAt',
      'updatedAt',
    ]);
    response.json({ user: userAttributes });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (request, response, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: request.params.id,
      },
    });
    if (!user) {
      throw new NotFoundError(`User not found with ID ${request.params.id}`);
    }

    const updatableFields = ['name', 'email'];
    const bodyData = _.pick(request.body, updatableFields);
    const filteredBodyData = _.pickBy(bodyData, data => !_.isEmpty(data));
    if (_.isEmpty(filteredBodyData)) {
      throw new RequestError(
        `To update a user, please include at least one of the following fields in the POST body:  ${updatableFields.join(
          ','
        )}`
      );
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: request.params.id,
      },
      data: filteredBodyData,
    });

    response.json({ user: updatedUser });
  } catch (error) {
    next(error);
    return;
  }
});

router.delete('/:id', async (request, response, next) => {
  try {
    const User = await prisma.user.findUnique({
      where: {
        id: request.params.id,
      },
    });
    if (!User) {
      throw new NotFoundError(`User not found with ID ${request.params.id}`);
    }

    await prisma.user.delete({
      where: {
        id: request.params.id,
      },
    });
    response.json({
      message: `Successfully deleted user`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
