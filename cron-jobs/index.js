const cron = require('cron');
const logger = require('../components/logger');
const PetFinderCron = require('./pet-finder');
const context = require('../data/dbContext');
const authenticate = require('../components/authenticate');

function initJobs() {
  const job = new cron.CronJob({
    cronTime: '* 1 * * * *',
    onTick: async function () {
      logger.info(`cron fire ${Date.now()}...`);
      const syncEntities = [
        require('../components/sync/pet-finder/organization'),
      ];
      const petFinderCron = new PetFinderCron(
        context,
        logger,
        authenticate,
        syncEntities
      );
      await petFinderCron.start();
    },
    runOnInit: true,
  });
  job.start();
}

module.exports = initJobs;
