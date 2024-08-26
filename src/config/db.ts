import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { logger } from '@utils/logger.handle';

dotenv.config();
const envFile = process.env;
let MONGO_URI = '';

if (envFile.MONGO_MANAGER === 'aws') {
  MONGO_URI = `mongodb://${encodeURIComponent(envFile.MONGO_USER ?? '')}:${encodeURIComponent(envFile.MONGO_PASS ?? '')}@${encodeURIComponent(
    envFile.MONGO_HOST ?? ''
  )}:${envFile.MONGO_PORT}/?tls=true&tlsCAFile=./global-bundle.pem&retryWrites=false`;
} else {
  // mongodb+srv://juanloropeza:base51gnal5@cluster0.bvq69.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
  MONGO_URI = `mongodb+srv://${envFile.MONGO_USER}:${envFile.MONGO_PASS}@${envFile.MONGO_HOST}/${envFile.MONGO_DB_NAME}?retryWrites=true&w=majority`;
}

const connectDatabase = async (): Promise<void> => {
  try {
    const db = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 40000,
    });
    logger.info(`----- Database: ${db.connection.db?.databaseName} is conected! ------`);
  } catch (error) {
    logger.error('Error connecting to the database:', error);
    throw error;
  }
};

export default connectDatabase;
