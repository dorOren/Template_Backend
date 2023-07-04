const { getApp } = require('./app');
const configurationManager = require('./common/configurationManager.js');
const logger = require('./common/logger');

configurationManager.init();
const port = configurationManager.getPort();

const app = getApp();

app.listen(port, () => {
  logger.info(`App running on port ${port}...`);
});
