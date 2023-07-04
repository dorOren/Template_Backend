const mongoose = require('mongoose');
const express = require('express');
const app = require('./app');
const configurationManager = require('./common/configurationManager.js');
const logger = require('./common/logger');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const server = express();

exports.buildServer = () => {
  console.log('hi');
  connectToDB();
  registerPreRoutesMiddleWare();
  buildRoutes();
  registerPostRoutesMiddleWare();
  return server;
};

function connectToDB() {
  console.log('hi');
  const connectionstring = configurationManager.getDBConnectionString();
  console.log(connectionstring);
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
  app.use('/api/v1/tours', tourRouter);
  app.use('/api/v1/users', userRouter);
}

function registerPostRoutesMiddleWare() {}
