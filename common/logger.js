const pino = require('pino');

const logger = pino(
  pino.transport({
    target: 'pino-pretty',
    options: {
      colorize: true,
      sync: true,
      ignore: 'hostname,pid',
      tranlateTime: 'SYS:standard'
    }
  })
);

module.exports = logger;
