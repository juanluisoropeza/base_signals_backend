import dotenv from 'dotenv';
import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';
import config from '../config/index';
import { authSchema, userSchema } from '@models/validations/userValidation.schema';

dotenv.config();

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: { title: 'BASE SIGNALS API', version: '1.0.0' },
  servers: [{ url: process.env.SWG_HOST ?? '' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      ...userSchema,
      ...authSchema,
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: config.dev ? ['./src/routes/*.ts'] : ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerSpec };
