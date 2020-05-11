const express = require('express');
const router = express.Router();

function getOrganization(dbContext, logger) {
  router.get('/organization/:id', async (req, res, next) => {
    try {
      dbContext.Organization.findOne({ _id: req.params.id })
        .populate('animals')
        .exec((err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  });

  return router;
}

module.exports = getOrganization;
