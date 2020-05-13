const cron = require('cron');
const logger = require('../modules/logger');
const PetFinderCron = require('./pet-finder');
const dbContext = require('../data/animalDbContext');
const httpContext = require('../modules/sync/pet-finder/httpContext');
const authenticate = require('../modules/sync/pet-finder/authenticate');

function initJobs() {
  const job = new cron.CronJob({
    cronTime: '* * 3 * * *',
    onTick: async function () {
      const entitiesToSync = [require('../modules/sync/pet-finder/animal')];
      const petFinderCron = new PetFinderCron(
        dbContext,
        httpContext,
        logger,
        authenticate,
        entitiesToSync
      );
      await petFinderCron.start();
    },
    runOnInit: false,
  });
  job.start();
}

module.exports = initJobs;
