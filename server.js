import app from './src/app.js';
import Logger from './src/tools/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3001;

app.listen(port, () => {
  Logger.info(
    `HireU API listening at ${
      process.env.BASE_URL || `http://localhost:${port}`
    }`
  );
});
