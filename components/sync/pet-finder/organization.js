const PetFinderEntity = require('./base-entity');

class PetFinderOrganization extends PetFinderEntity {
  recordCount = 0;
  errorCount = 0;
  errors = [];

  constructor(context, logger, authenticate) {
    super(logger, authenticate, context);
  }

  async sync() {
    const params = { meta: { page: '1', limit: '100' } };

    try {
      const url = this.queryUrl(params);
      await this.authenticate();
      await this.processPages(url, this.processOrganization.bind(this));
    } catch (error) {
      this.logger.error(`post exception: ${error} body: ${params}`);
    }
  }

  async processOrganization(response) {
    let recordCount = 0;
    let errorCount = 0;
    let errors = [];

    for (const iterator of response.data.organizations) {
      try {
        await this.context.Organization.findOneAndUpdate(
          { id: iterator.id },
          iterator,
          {
            omitUndefined: true,
            returnOriginal: false,
            upsert: true,
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

  queryUrl(body) {
    const url = new URL('/v2/organizations', this.baseUrl);
    this.appendMeta(url, body.meta);
    return url;
  }
}

module.exports = PetFinderOrganization;
