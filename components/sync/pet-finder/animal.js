const PetFinderEntity = require('./base-entity');

class PetFinderAnimal extends PetFinderEntity {
  recordCount = 0;
  errorCount = 0;
  errors = [];

  constructor(context, logger, authenticate) {
    super(logger, authenticate, context);
  }

  async sync() {
    const params = {
      type: 'dog',
      age: 'senior',
      status: 'adoptable',
      location: 'wa',
      meta: { page: '1', limit: '100' },
    };

    try {
      const url = this.animalQuery(params);
      await this.authenticate();
      await this.processPages(url, this.processAnimal.bind(this));
    } catch (error) {
      this.logger.error(`post exception: ${error} body: ${params}`);
    }
  }

  async processAnimal(response) {
    let recordCount = 0;
    let errorCount = 0;
    let errors = [];

    for (const iterator of response.data.animals) {
      try {
        await this.context.Animal.findOneAndUpdate(
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

  animalQuery(body) {
    const url = new URL('/v2/animals', this.baseUrl);
    this.appendMeta(url, body.meta);
    this.appendSearch(url, body);
    return url;
  }

  appendSearch(url, body) {
    this.append(url, 'id', body.id);
    this.append(url, 'type', body.type);
    this.append(url, 'size', body.size);
    this.append(url, 'gender', body.gender);
    this.append(url, 'age', body.age);
    this.append(url, 'organization', body.organization);
    this.append(url, 'good_with_children', body.good_with_children);
    this.append(url, 'good_with_dogs', body.good_with_dogs);
    this.append(url, 'good_with_cats', body.good_with_cats);
    this.append(url, 'location', body.location);
    this.append(url, 'distance', body.distance);
  }
}

module.exports = PetFinderAnimal;
