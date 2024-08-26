import type { Request, Response } from 'express';
import { AppModules } from '../interfaces/appModules.enum';
import { UserRole } from '../interfaces/user.interface';
import { loginUser, registerNewUser } from '../services/auth.service';
import { getUserByEmail } from '../services/user.service';
import { errorCatch } from '../utils/errorCatch.handle';
import { logger } from '../utils/logger.handle';

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { body } = req;
    body.active = true;
    const userExist = await getUserByEmail(body.email);
    if (userExist) {
      res.status(400).json({
        status: 400,
        message: 'USER_ALREADY_EXIST',
      });
      return;
    }
    const userData = { ...body, role: UserRole.CUSTOMER };
    const responseUser = await registerNewUser(userData);

    res.status(201).json({
      status: 201,
      data: responseUser,
      message: 'USER_SUCCESFULLY_CREATED',
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json(errorCatch('ERROR_CREATING_USER'));
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const responseUser = await loginUser(email, password);

    if (responseUser === 'PASSWORD_INCORRECT' || responseUser === 'NOT_FOUND_USER') {
      res.status(403).json({
        status: 403,
        data: responseUser,
      });
      return;
    }
    res.status(200).json({
      status: 200,
      data: responseUser,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json(errorCatch('ERROR_LOGIN', AppModules.user));
  }
};

export { createUser, login };
