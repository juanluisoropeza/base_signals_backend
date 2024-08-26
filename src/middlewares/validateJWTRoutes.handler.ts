import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.handle';

const validateJWTRoute = (req: Request, res: Response, next: NextFunction) => {
  const message = 'Invalid user, you need to have a valid token';
  const accessToken = req.headers.authorization;
  const statusCode = 401;
  if (accessToken) {
    const validToken = verifyToken(accessToken);
    if (validToken) {
      next();
      return;
    }
  }
  res.status(statusCode).send({ statusCode, message });
};

export { validateJWTRoute };
