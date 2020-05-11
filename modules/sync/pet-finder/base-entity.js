const axios = require('axios');

class PetFinderEntity {
  constructor(dbContext, httpContext, sourceId, logger, authenticate) {
    this.sourceId = sourceId;
    this.logger = logger;
    this.authenticate = authenticate;
    this.dbContext = dbContext;
    this.httpContext = httpContext;
  }

  async processPageSets(httpFunc, processResponseFunc) {
    const searchParams = new URLSearchParams(httpFunc.url.searchParams);
    const startPage = searchParams.get('page');

    let page = startPage === null ? 1 : startPage;
    let response = {};
    let meta = {};

    while (page > 0) {
      try {
        response = await httpFunc.get();

        if (response) {
          if (page === '1' && response.data.pagination) {
            this.logger.info(
              `total pages: ${response.data.pagination.total_pages} | total count: ${response.data.pagination.total_count}`
            );
          }

          meta = await processResponseFunc(response, this.dbContext);

          this.logger.info(
            `page url: ${url} | page #: ${page} | processed: ${meta.recordCount} | errors: ${meta.errorCount}`
          );

          page = this.getNextPage(response.data);
          httpFunc.url.searchParams.set('page', page);
        } else {
          page = 0;
        }
      } catch (error) {
        this.logger.error(error);
      }
    }

    this.logger.info('page processing complete');
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
