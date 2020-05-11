const router = require('express').Router();
const dbContext = require('../data/animalDbContext');
const logger = require('../modules/logger');

router.use(require('./getDogs')(dbContext, logger));
router.use(require('./getDog')(dbContext, logger));
router.use(require('./getOrganization')(dbContext, logger));

module.exports = router;
