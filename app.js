const server = require('./server');

exports.getApp = () => {
  const app = server.buildServer();
  return app;
};
