import morgan from 'morgan';
import Logger from '../tools/logger.js';

const stream = {
  write: message => Logger.http(message),
};

function getFormat() {
  return process.env.NODE_ENV === 'development' ? 'dev' : 'short';
}

export default morgan(getFormat(), { stream });
