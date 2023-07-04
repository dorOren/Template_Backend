const dotenv = require('dotenv');

exports.init = () => {
  dotenv.config({ path: './config.env' });
};

exports.isLoggerEnabled = () => {
  return process.env.LOG_ENABLED;
};

exports.getPort = () => {
  return process.env.PORT || 3000;
};

exports.getDBConnectionString = () => {
  return process.env.DB_CONNECTION.replace(
    '<PASSWORD>',
    process.env.DB_PASSWORD
  );
};

exports.getJWTSecret = () => {
  return process.env.JWT_SECRET;
};

exports.getJWTExpiresIn = () => {
  return process.env.JWT_EXPIRES_IN;
};
