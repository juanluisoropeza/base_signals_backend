import path from 'path';
import { createLogger, format, transports } from 'winston';
const errorFilename = `${path.join(__dirname, '../../logs/error/backend.log')}`;
const debugFilename = `${path.join(__dirname, '../../logs/debug/backend.log')}`;
const infoFilename = `${path.join(__dirname, '../../logs/info/backend.log')}`;

export const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf((info) => `[${info.timestamp}][${info.level}]: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: errorFilename,
      maxsize: 10 * 1000000,
      level: 'error',
      maxFiles: 100,
    }),
    new transports.File({
      filename: infoFilename,
      maxsize: 10 * 1000000,
      level: 'info',
      maxFiles: 100,
    }),
    new transports.File({
      filename: debugFilename,
      maxsize: 10 * 1000000,
      level: 'debug',
      maxFiles: 100,
    }),
    new transports.Console({ level: 'info' }),
    new transports.Console({ level: 'error' }),
  ],
});
