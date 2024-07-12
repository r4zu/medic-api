import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  DB_PASSWORD: Joi.string(),
  DB_NAME: Joi.string(),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().default('postgres'),
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string(),
});
