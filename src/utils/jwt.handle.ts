import JWT, { sign } from 'jsonwebtoken';
import { TokenInfo } from '../interfaces/token.interface';
import { logger } from './logger.handle';

const JWT_SECRET = process.env.JWT_SECRET ?? 'v$!jk87';

const getIdUser = (token: string): string => {
  const dataOfToken = decode(token);
  return dataOfToken.id.toString();
};

const generateToken = (id: string) => {
  const jwt = sign({ id }, JWT_SECRET, {
    expiresIn: '1h',
  });
  return jwt;
};

const decode = (token: string) => {
  let dataOfToken: TokenInfo;
  const tokenHash = token.substring(7, token.length);
  const decodedToken: any = JWT.decode(tokenHash);
  if (typeof decodedToken === 'string') {
    dataOfToken = JSON.parse(decodedToken);
  } else {
    dataOfToken = decodedToken;
  }
  return dataOfToken;
};

const verifyToken = (token: string) => {
  const tokenHash = token.substring(7, token.length);
  let success = false;
  try {
    success = Boolean(JWT.verify(tokenHash, JWT_SECRET));
  } catch (error) {
    logger.error(error);
  }
  return success;
};

export { decode, generateToken, getIdUser, verifyToken };
