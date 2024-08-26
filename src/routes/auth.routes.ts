import { Router } from 'express';
import { createUser, login } from '../controllers/auth.controller';
import { validationMiddleware } from '../middlewares/validation.handler';
import { authSchema, userSchema } from '../models/validations/userValidation.schema';

const router = Router();

router.post('/register', validationMiddleware(userSchema, { strict: true }), createUser);
router.post('/login', validationMiddleware(authSchema, { strict: true }), login);

export { router };

/**
 * Get track
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - users auth
 *     summary: "Login user"
 *     description: "Login user"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/auth'
 *     responses:
 *       '200':
 *         description: "USERS_LISTED"
 *       '403':
 *         description: "PASSWORD_INCORRECT"
 *       '500':
 *         description: "ERROR_LOGIN"
 *     security:
 *       - bearerAuth: []
 *
 * /api/auth/register:
 *   post:
 *     tags:
 *       - users auth
 *     summary: "Register user"
 *     description: "Register user"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       '201':
 *         description: "USER_SUCCESFULLY_CREATED"
 *       '500':
 *         description: "ERROR_CREATING_USER"
 *     security:
 *       - bearerAuth: []
 *
 */
