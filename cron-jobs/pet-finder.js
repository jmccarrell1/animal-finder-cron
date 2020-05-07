require('dotenv').config();

class PetFinderCron {
  constructor(dataContext, logger, authenticate, syncEntities) {
    this.dataContext = dataContext;
    this.logger = logger;
    this.authenticate = authenticate;
    this.syncEntities = syncEntities;
  }

  async start() {
    let objectEntity;
    let entity;

    for (let index = 0; index < this.syncEntities.length; index++) {
      try {
        objectEntity = this.syncEntities[index];
        entity = new objectEntity(
          this.dataContext,
          this.logger,
          this.authenticate
        );
        await entity.sync();
      } catch (error) {
        this.error(`error processing ${objectEntity}: ${error}`);
      }
    }
  }
}

module.exports = PetFinderCron;
