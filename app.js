require('dotenv').config();
const express = require('express');
const initJobs = require('./cron-jobs');

class App {
  constructor() {
    this.app = express();
    initJobs();
  }
}

module.exports = new App().app;
