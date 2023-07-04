const mongoose = require('mongoose');
const express = require('express');
const configurationManager = require('./common/configurationManager.js');
const logger = require('./common/logger');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const server = express();

exports.buildServer = () => {
  connectToDB();
  registerPreRoutesMiddleWare();
  buildRoutes();
  registerPostRoutesMiddleWare();
  return server;
};

function connectToDB() {
  const connectionstring = configurationManager.getDBConnectionString();
  mongoose.connect(connectionstring).then(() => {
    logger.info('connection successful!');
  });
}

function registerPreRoutesMiddleWare() {
  // Parses incoming requests to JSON
  server.use(express.json());
  // Set static folder
  server.use(express.static(`${__dirname}/public`));
}

function buildRoutes() {
  server.use('/api/v1/tours', tourRouter);
  server.use('/api/v1/users', userRouter);
}

function registerPostRoutesMiddleWare() {}
