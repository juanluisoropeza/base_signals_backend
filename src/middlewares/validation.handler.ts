import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

const validationMiddleware = (schema: yup.ObjectSchema<any>, options?: { strict: boolean }) => async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  try {
    await schema.validate(body, { abortEarly: false, ...options });
    next();
  } catch (error) {
    if (yup.ValidationError.isError(error)) {
      const errorMessages = error.errors.join(', ');
      return res.status(400).json({
        status: 400,
        error: errorMessages,
      });
    } else {
      return res.status(400).json({
        status: 400,
        error: 'Error de validación',
      });
    }
  }
};

export { validationMiddleware };
