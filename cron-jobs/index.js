const cron = require('cron');
const logger = require('../components/logger');
const PetFinderCron = require('./pet-finder');
const context = require('../data/context');

function initJobs() {
  const job = new cron.CronJob({
    cronTime: '* 1 * * * *',
    onTick: async function () {
      logger.info(`cron fire ${Date.now()}...`);
      const petFinderCron = new PetFinderCron(context, logger);
      petFinderCron.start();
    },
    runOnInit: true,
  });
  job.start();
}

module.exports = initJobs;
