require('dotenv').config();
const axios = require('axios');
const queryBuilder = require('./query-builder');

class PetFinderCron {
  constructor(dataContext, logger) {
    this.dataContext = dataContext;
    this.logger = logger;
  }

  async start() {
    const params = {
      type: 'dog',
      age: 'senior',
      status: 'adoptable',
      location: 'wa',
      meta: { page: '1' },
    };

    try {
      const url = queryBuilder.buildAnimal(params);
      await this.authenticate();
      await this.processPages(url);
    } catch (error) {
      this.logger.error(`post exception: ${error} body: ${params}`);
    }
  }

  async processPages(url) {
    const searchParams = new URLSearchParams(url.searchParams);
    const startPage = searchParams.get('page');

    let page = startPage;
    let count = 0;
    let errors = 0;

    let response = {};

    while (page > 0) {
      response = await axios.get(url.href, url);

      if (response) {
        for (const iterator of response.data.animals) {
          try {
            this.dataContext.Animal.findOneAndUpdate(
              { id: iterator.id },
              iterator,
              {
                omitUndefined: true,
                returnOriginal: false,
                upsert: true,
              }
            );
            count++;
          } catch (error) {
            this.logger.error(error);
            errors++;
          }
        }

        this.logger.info(
          `current page: ${page} processed: ${count} errors: ${errors}`
        );

        page = this.getNextPage(response.data);
        url.searchParams.set('page', page);
      } else {
        page = 0;
      }
    }

    this.logger.info('done');
  }

  getNextPage(data) {
    const nextPage = data.pagination.current_page + 1;
    const totalPages = data.pagination.total_pages;

    if (nextPage <= totalPages) {
      return nextPage;
    }

    return 0;
  }

  async authenticate() {
    const response = await axios.post(
      process.env.AUTH_TOKEN_URL,
      {
        grant_type: process.env.AUTH_GRANT_TYPE,
        client_id: process.env.AUTH_CLIENT_ID,
        client_secret: process.env.AUTH_CLIENT_SECRET,
      },
      {
        headers: { 'content-type': 'application/json' },
      }
    );

    if (response) {
      if (response.data.access_token) {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + response.data.access_token;
      }
    }
  }
}

module.exports = PetFinderCron;
