import { ErrorResponse } from '../interfaces/errorResponse.interface';
import { logger } from './logger.handle';

export const errorCatch = (error: any, errorModule?: string): ErrorResponse => {
  if (error instanceof Error) {
    logger.error(error);
    if (error.message.includes('Cast to ObjectId failed for value')) {
      const errorModuleFormatted = `${errorModule?.toUpperCase()}_`;
      return { status: 404, message: `${errorModuleFormatted}NOT_FOUND` };
    }
    return { status: 500, message: error.message };
  } else {
    return { status: 500, error };
  }
};
