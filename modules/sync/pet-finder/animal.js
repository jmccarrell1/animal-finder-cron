const PetFinderEntity = require('./base-entity');

class PetFinderAnimal extends PetFinderEntity {
  recordCount = 0;
  errorCount = 0;
  errors = [];

  constructor(dbContext, httpContext, sourceId, logger, authenticate) {
    super(dbContext, httpContext, sourceId, logger, authenticate);
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
      const httpAnimal = await this.httpContext.HttpAnimal(params);
      const processAnimalCallback = await this.processAnimal.bind(this);

      await this.authenticate();
      await this.processPageSets(httpAnimal, processAnimalCallback);
    } catch (error) {
      this.logger.error(`post exception: ${error} body: ${params}`);
    }
  }

  async processAnimal(response) {
    let recordCount = 0;
    let errorCount = 0;
    let errors = [];

    for (const petFinderAnimal of response.data.animals) {
      try {
        const animalFinderAnimal = await this.upsertAnimal(
          this.sourceId,
          petFinderAnimal
        );

        await this.upsertOrganization(this.sourceId, animalFinderAnimal);

        recordCount++;
      } catch (error) {
        errorCount++;
        errors.push(error);
      }
    }

    return { recordCount: recordCount, errorCount: errorCount, errors: errors };
  }

  async upsertAnimal(sourceId, petFinderAnimal) {
    const animalFinderAnimal = this.mapToAnimalFinderAnimal(
      petFinderAnimal,
      sourceId
    );

    const upsertAnimal = await this.dbContext.Animal.findOneAndUpdate(
      {
        external_id: animalFinderAnimal.external_id,
        external_organization_id: animalFinderAnimal.external_organization_id,
        external_source_id: sourceId,
      },
      animalFinderAnimal,
      {
        omitUndefined: true,
        upsert: true,
        new: true,
      }
    );

    return upsertAnimal;
  }

  async upsertOrganization(sourceId, animalFinderAnimal) {
    const petFinderOrganization = await this.getPetFinderOrganization(
      animalFinderAnimal.external_organization_id
    );

    const animalFinderOrganization = this.mapToAnimalFinderOrganization(
      petFinderOrganization,
      sourceId
    );

    const upsertOrganization = await this.dbContext.Organization.findOneAndUpdate(
      {
        external_source_id: animalFinderOrganization.external_source_id,
        external_id: animalFinderOrganization.external_id,
      },
      animalFinderOrganization,
      {
        omitUndefined: true,
        upsert: true,
        new: true,
      }
    );

    this.linkAnimalToOrganization(upsertOrganization, animalFinderAnimal);
    this.linkOrganizationToAnimal(animalFinderAnimal, upsertOrganization);

    return upsertOrganization;
  }

  linkAnimalToOrganization(animalFinderOrganization, animalFinderAnimal) {
    animalFinderOrganization.animals.push(animalFinderAnimal);
    animalFinderOrganization.save();
  }

  linkOrganizationToAnimal(animalFinderAnimal, animalFinderOrganization) {
    animalFinderAnimal.organization = animalFinderOrganization;
    animalFinderAnimal.save();
  }

  async getPetFinderOrganization(external_organization_id) {
    const params = {
      external_organization_id: external_organization_id,
      meta: {},
    };

    const httpOrganization = await this.httpContext.HttpOrganization(params);

    const petFinderOrganization = await httpOrganization.get();

    return petFinderOrganization.data.organization;
  }

  mapToAnimalFinderAnimal(petFinderAnimal, sourceId) {
    const animalFinderAnimal = petFinderAnimal;

    animalFinderAnimal.external_id = petFinderAnimal.id;
    delete animalFinderAnimal.id;

    animalFinderAnimal.external_organization_id =
      petFinderAnimal.organization_id;
    delete animalFinderAnimal.organization_id;

    animalFinderAnimal.external_source_id = sourceId;

    return animalFinderAnimal;
  }

  mapToAnimalFinderOrganization(petFinderOrganization, sourceId) {
    const animalFinderOrganization = petFinderOrganization;

    animalFinderOrganization.external_id = petFinderOrganization.id;
    delete animalFinderOrganization.id;

    animalFinderOrganization.external_source_id = sourceId;

    return animalFinderOrganization;
  }
}

module.exports = PetFinderAnimal;
