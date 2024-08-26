import { NextFunction, Request, Response } from 'express';
import { getUserById } from '../services/user.service';
import { errorCatch } from '../utils/errorCatch.handle';
import { getIdUser } from '../utils/jwt.handle';

const verifyUserRole = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    res.status(500).json(errorCatch('Invalid user, you need to have a valid token'));
    return;
  }
  const userId = getIdUser(accessToken);
  const user = await getUserById(userId);

  if (!user || user.role !== 'admin') {
    res.status(403).send({ status: 403, message: 'ACCESS_DENIED' });
  } else {
    next();
  }
};

export { verifyUserRole };
