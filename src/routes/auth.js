import express from 'express';
import bcrypt from 'bcrypt';
import Prisma from '../tools/prisma.js';
import validator from 'validator';
import { RequestError } from '../constants/commonErrors.js';
import jwt from '../tools/jwt.js';

const router = express.Router();

router.post('/signup', async (request, response, next) => {
  try {
    const userEmail = request.body.email;
    if (!userEmail || !userEmail.trim() || !validator.isEmail(userEmail)) {
      throw new RequestError('Must provide a valid email');
    }
    if (!request.body.name) {
      throw new RequestError('Must provide a valid name');
    }
    const userPassword = request.body.password;
    if (!userPassword || !userPassword.trim()) {
      throw new RequestError('Must provide a valid password');
    }

    const user = await Prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (user) {
      throw new RequestError('An account with that email already exists');
    }

    const passwordHash = await bcrypt.hash(userPassword, 10);

    const newUser = await Prisma.user.create({
      data: {
        name: request.body.name,
        email: userEmail,
        password: passwordHash,
      },
    });

    // respond with a success message
    response.json({
      message: 'Created user in database!',
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/signout', async (request, response, next) => {
  try {
    const refreshToken =
      request.body.refreshToken || request.cookies.refreshToken;

    if (!refreshToken) {
      throw new RequestError('No refresh token provided');
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    } catch {
      throw new RequestError('Invalid refresh token');
    }

    await Prisma.refreshToken.deleteMany({
      where: {
        token: refreshToken,
        userId: decoded.userId,
      },
    });

    response.json({
      message: 'Signed out successfully!',
    });
  } catch (error) {
    next(error);
  }
});


export default router;
