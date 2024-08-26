import connectDatabase from '@config/db';
import { logger } from '@utils/logger.handle';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config/index';
import { notFoundHandler } from '@middlewares/notFound.handler';
import { router } from '@routes/index.routes';

const app = express();

// BD connect
const starDB = async () => {
  try {
    await connectDatabase();
  } catch (error) {
    logger.error('Error connecting to the database:', error);
    process.exit(1);
  }
};
starDB();

// middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(helmet.permittedCrossDomainPolicies());
app.use(cors());
app.use(express.json());

// routes
app.use('/api', router);

// Errors middlewares
app.use(notFoundHandler);

// server
app.listen(config.port, () => {
  logger.info('------------ BACKEND SIGNALS NODEJS -------------');
  logger.info('------------ Listening port: ' + config.port + '  -------------');
  logger.info(`Documentation API Swagger: ${config.swg_host}/api/docs`);
});
