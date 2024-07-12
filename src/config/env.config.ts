export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  db_host: process.env.DB_HOST || 'localhost',
  db_port: process.env.DB_PORT || 5432,
  db_username: process.env.DB_USERNAME || 'postgres',
  port: process.env.PORT || 3000,
  jwt: process.env.JWT_SECRET,
});
