import dotenv from 'dotenv';
dotenv.config();

const config = {
  swg_host: process.env.SWG_HOST,
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT ?? 3001,
  SECRET_KEY: process.env.JWT_SECRET ?? 'Signals2024#JL',
};

export default config;
