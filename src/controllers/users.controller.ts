import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User, UserRole } from '@interfaces/user.interface';
import { deleteUser, getUserById, getUsers, updateUser } from '@services/user.service';
import { errorCatch } from '@utils/errorCatch.handle';
import { logger } from '@utils/logger.handle';
import { validateCorrectIdQueryParam } from '@utils/validateQueryParam.handle';
import { AppModules } from '@interfaces/appModules.enum';
import { getIdUser } from '@utils/jwt.handle';

const getUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getUsers();
    const usersEdited = await Promise.all(
      users.map(async (user: User) => {
        const userFormatted = {
          _id: user._id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          gender: user.gender,
          active: user.active,
        };
        return userFormatted;
      })
    );
    res.status(200).json({
      status: 200,
      data: usersEdited,
      message: 'USERS_LISTED',
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json(errorCatch('ERROR_GETTING_USERS'));
  }
};

const getUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.userId;
    const validateId = validateCorrectIdQueryParam(id);
    if (!validateId) {
      res.status(400).json({ status: 400, message: 'INVALID_USER_ID' });
      return;
    }
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({
        data: {},
        message: 'USER_NOT_FOUND',
      });
    } else {
      const userFormatted = async () => {
        const userData = {
          _id: user._id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          role: user.role,
          gender: user.gender,
          active: user.active,
        };
        return userData;
      };

      const formattedUser = await userFormatted();

      res.status(200).json({
        status: 200,
        data: formattedUser,
        message: 'USER_LISTED',
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json(errorCatch('ERROR_GETTING_USER', AppModules.user));
  }
};

const updateUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ status: 400, message: 'INVALID_USER_ID' });
      return;
    }
    const user = await getUserById(id);
    if (user) {
      if (user.role !== UserRole.ADMIN && req.body.role) {
        res.status(401).json({ status: 401, message: 'YOU_CANNOT_PERFORM_THIS_OPERATION' });
        return;
      }
      const updatedUser = await updateUser(id, req.body);
      res.status(200).json({
        data: updatedUser,
        message: 'USER_UPDATED',
      });
    } else {
      res.status(404).json({ status: 404, message: 'USER_NOT_FOUND' });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json(errorCatch('ERROR_MODIFYING_USER'));
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ status: 400, message: 'INVALID_USER_ID' });
      return;
    }
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      res.status(401).json(errorCatch('INVALID_USER_YOU_NEED_TO_HAVE_A_VALID_TOKEN', AppModules.user));
      return;
    }

    const userLoggedId = getIdUser(accessToken);
    const userLogged = await getUserById(userLoggedId);
    if (userLogged?.role !== UserRole.ADMIN) {
      res.status(401).json({ status: 401, message: 'YOU_CANNOT_PERFORM_THIS_OPERATION' });
      return;
    }

    const user = await getUserById(id);
    if (user) {
      const deletedUser = await deleteUser(id);
      res.status(200).json({
        data: deletedUser,
        message: 'USER_DELETED',
      });
    } else {
      res.status(404).json({ status: 404, message: 'USER_NOT_FOUND' });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json(errorCatch('ERROR_DELETING_USER', AppModules.user));
  }
};

export { getUsersController, getUserController, updateUserController, deleteUserController };
