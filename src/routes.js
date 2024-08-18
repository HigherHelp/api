import express from 'express';
import sampleRoutes from './routes/sample.js';
// import the auth routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import universityRoutes from './routes/university.js';

export default express
  .Router()
  .use('/sample', sampleRoutes)
  // register them
  .use('/auth', authRoutes)
  .use('/users', userRoutes)
  .use('/university', universityRoutes);
