import express from 'express';
import prisma from '../tools/prisma.js';

const router = express.Router();

router.get('/', async (request, response) => {
  const universityList = await prisma.university.findMany();
  response.json({ universityList });
});

export default router;
