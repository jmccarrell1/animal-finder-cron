const PetFinderEntity = require('./base-entity');

class PetFinderType extends PetFinderEntity {
  recordCount = 0;
  errorCount = 0;
  errors = [];

  constructor(context, logger, authenticate) {
    super(logger, authenticate, context);
  }

  async sync() {
    const params = { meta: { page: '1', limit: '100' } };

    try {
      const url = this.typeQuery(params);
      await this.authenticate();
      await this.processPages(url, this.processType.bind(this));
    } catch (error) {
      this.logger.error(`post exception: ${error} body: ${params}`);
    }
  }

  async processType(response) {
    let recordCount = 0;
    let errorCount = 0;
    let errors = [];

    for (const iterator of response.data.types) {
      try {
        let foo = await this.context.Type.findOneAndUpdate(
          { name: iterator.name },
          iterator,
          {
            omitUndefined: true,
            returnOriginal: false,
            upsert: true,
            rawResult: true,
          }
        );
        recordCount++;
      } catch (error) {
        errorCount++;
        errors.push(error);
      }
    }

    return { recordCount: recordCount, errorCount: errorCount, errors: errors };
  }

  typeQuery(body) {
    const url = new URL('/v2/types', this.baseUrl);
    this.appendMeta(url, body.meta);
    return url;
  }
}

module.exports = PetFinderType;
