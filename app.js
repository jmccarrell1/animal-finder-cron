require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const logger = require('./modules/logger');
const initJobs = require('./cron-jobs');

class App {
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use('/api', routes);
    this.app.use((req, res, next) => {
      const error = new Error('Not found');
      error.status = 404;
      next(error);
    });
    this.app.use((error, req, res, next) => {
      logger.error(`Unhandled exception bubbled up: ${error}`);
      res.status(error.status || 500).send({
        error: {
          status: error.status || 500,
          message: error.message || 'Internal Server Error',
        },
      });
    });
    initJobs();
  }
}

module.exports = new App().app;
