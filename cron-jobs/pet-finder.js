require('dotenv').config();

class PetFinderCron {
  sourceId = 'petfinder';

  constructor(dbContext, httpContext, logger, authenticate, entitiesToSync) {
    this.dbContext = dbContext;
    this.httpContext = httpContext;
    this.logger = logger;
    this.authenticate = authenticate;
    this.entitiesToSync = entitiesToSync;
  }

  async start() {
    let objectEntity;
    let entity;

    this.logger.info(`PetFinderCron starting ${Date.now()}...`);

    for (let index = 0; index < this.entitiesToSync.length; index++) {
      try {
        objectEntity = this.entitiesToSync[index];
        entity = new objectEntity(
          this.dbContext,
          this.httpContext,
          this.sourceId,
          this.logger,
          this.authenticate
        );
        await entity.sync();
      } catch (error) {
        this.logger.error(
          `error running PetFinderCron: ${objectEntity}: ${error}`
        );
      }
    }

    this.logger.info(`PetFinderCron stopping ${Date.now()}...`);
  }
}

module.exports = PetFinderCron;
