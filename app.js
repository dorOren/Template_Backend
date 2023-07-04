const server = require('./server');

exports.getApp = () => {
  console.log('hi');
  const app = server.buildServer();
  return app;
};
