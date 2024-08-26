import { Router } from 'express';
import { deleteUserController, getUserController, getUsersController, updateUserController } from '../controllers/users.controller';
import { validateJWTRoute } from '../middlewares/validateJWTRoutes.handler';
import { verifyUserRole } from '@middlewares/verifyUserRole.handler';
import { updateUserSchema } from '@models/validations/userValidation.schema';
import { validationMiddleware } from '@middlewares/validation.handler';

const router = Router();

router.get('/', validateJWTRoute, getUsersController);
router.get('/:userId', validateJWTRoute, getUserController);
router.put('/:userId', validateJWTRoute, validationMiddleware(updateUserSchema), updateUserController);
router.delete('/:userId', validateJWTRoute, verifyUserRole, deleteUserController);

export { router };

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - users
 *     summary: "Allows you to obtain the users"
 *     description: "Get all users"
 *     responses:
 *       '200':
 *         description: "USERS_LISTED"
 *       '500':
 *         description: "ERROR_GETTING_USERS"
 *     security:
 *       - bearerAuth: []
 *
 * /api/users/{userId}:
 *   get:
 *     tags:
 *       - users
 *     summary: "Allows you to obtain users by userId"
 *     description: "Get all users by userId"
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: "INVALID_USER_ID"
 *       '400':
 *         description: "USER_LISTED"
 *       '404':
 *         description: "USER_NOT_FOUND"
 *       '500':
 *         description: "ERROR_GETTING_USER"
 *     security:
 *       - bearerAuth: []
 *   put:
 *     tags:
 *       - users
 *     summary: "Modify user data"
 *     description: "Edit user"
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       '200':
 *         description: "USER_UPDATED"
 *       '400':
 *         description: "INVALID_USER_ID"
 *       '401':
 *         description: "YOU_CANNOT_PERFORM_THIS_OPERATION"
 *       '404':
 *         description: "USER_NOT_FOUND"
 *       '500':
 *         description: "ERROR_MODIFYING_USER"
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     tags:
 *       - users
 *     summary: "Delete user"
 *     description: "Edit user"
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: "USER_DELETED"
 *       '400':
 *         description: "INVALID_USER_ID"
 *       '401':
 *         description: "YOU_CANNOT_PERFORM_THIS_OPERATION"
 *       '404':
 *         description: "USER_NOT_FOUND"
 *       '500':
 *         description: "ERROR_DELETING_USER"
 *     security:
 *       - bearerAuth: []
 *
 */
