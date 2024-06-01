import express from 'express';
import sampleRoutes from './routes/sample.js';

export default express
  .Router()
  .use('/sample', sampleRoutes)
  .use('/example', sampleRoutes);
