import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env' : `.env.${process.env.NODE_ENV || 'development'}.local`,
});

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT,
  DATABASE: {
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    NAME: process.env.DATABASE_NAME,
    HOST: process.env.DATABASE_HOST,
    DIALECT: process.env.DATABASE_DIALECT,
    PORT: process.env.DATABASE_PORT,
  },
  REDIS: {
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT,
    TIMEOUT: 3600000,
  },
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
