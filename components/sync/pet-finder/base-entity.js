const axios = require('axios');

class PetFinderEntity {
  baseUrl = 'https://api.petfinder.com';

  constructor(logger, authenticate, context) {
    this.logger = logger;
    this.authenticate = authenticate;
    this.context = context;
  }

  append(url, key, value) {
    if (value) {
      url.searchParams.set(key, value);
    }
  }

  appendMeta(url, meta) {
    this.append(url, 'page', meta.page);
    this.append(url, 'limit', meta.limit);
    this.append(url, 'sort', meta.sort);
  }

  async processPages(url, func) {
    const searchParams = new URLSearchParams(url.searchParams);
    const startPage = searchParams.get('page');

    let page = startPage === null ? 1 : startPage;
    let response = {};
    let meta = {};

    while (page > 0) {
      try {
        response = await axios.get(url.href, url);

        if (response) {
          if (page === '1' && response.data.pagination) {
            this.logger.info(
              `total pages: ${response.data.pagination.total_pages} | total count: ${response.data.pagination.total_count}`
            );
          }

          meta = await func(response, this.context);

          this.logger.info(
            `current page: ${page} | processed: ${meta.recordCount} | errors: ${meta.errorCount}`
          );

          page = this.getNextPage(response.data);
          url.searchParams.set('page', page);
        } else {
          page = 0;
        }
      } catch (error) {
        this.logger.error(error);
      }
    }

    this.logger.info('done');
  }

  getNextPage(data) {
    if (!data.pagination) {
      return 0;
    }

    const nextPage = data.pagination.current_page + 1;
    const totalPages = data.pagination.total_pages;

    if (nextPage <= totalPages) {
      return nextPage;
    }

    return 0;
  }
}

module.exports = PetFinderEntity;
