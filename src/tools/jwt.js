import jwt from 'jsonwebtoken';
import Logger from './logger.js';

const DEFAULT_SECRET = 'unsafe_secret';

/**
 * Wrapper for jsonwebtoken sign function. Takes care of privateKey
 * @param {Object} data - data to be encoded in token
 * @param {String|Number}  [expiration="15min"] - from jsonwebtoken expiresIn arg. Defaults to '15min'
 * @return {JsonWebToken} token
 */
export function sign(data, expiration = '15min') {
  ensureJWTSecret();
  return jwt.sign(
    {
      data,
    },
    process.env.JWT_SECRET ?? DEFAULT_SECRET,
    { expiresIn: expiration }
  );
}

/**
 * Wrapper for jsonwebtoken verify function. Takes care of private key and promisifies.
 * @param {JsonWebToken} token - signed token, retrieve from sign function in same module
 * @return {Promise<any>} parsed token data
 */
export async function verify(token) {
  ensureJWTSecret();
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET ?? DEFAULT_SECRET,
      (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data?.data);
      }
    );
  });
}

function ensureJWTSecret() {
  if (!process.env.JWT_SECRET) {
    const isRunningInSafeEnvironment = [
      'development',
      'test',
      'ci',
      'staging',
    ].includes(process.env.NODE_ENV);

    if (!isRunningInSafeEnvironment) {
      Logger.debug(
        'JWT_SECRET not set in environment variables. Using UNSAFE default.'
      );
    }

    if (!isRunningInSafeEnvironment) {
      throw new Error(
        'JWT Tool:::JWT_SECRET not set in environment variables. Cannot sign tokens securely.'
      );
    }
  }
}

export default {
  sign,
  verify,
};
