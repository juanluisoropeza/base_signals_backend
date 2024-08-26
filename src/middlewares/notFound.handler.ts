import { NextFunction, Request, Response } from 'express';

const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    status: 404,
    message: 'Route not found',
  });
  next();
};

export { notFoundHandler };
