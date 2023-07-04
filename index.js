const { getApp } = require('./app');
const { createServer } = require('./server');
const configurationManager = require('./common/configurationManager.js');
const logger = require('./common/logger');

console.log('hi');
configurationManager.init();
const port = configurationManager.getPort();
console.log('hi');
const app = getApp();
const server = createServer(app);

server.listen(port, () => {
  console.log('hi');
  logger.info(`App running on port ${port}...`);
});
