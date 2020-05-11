const express = require('express');
const router = express.Router();

function getDogs(dbContext, logger) {
  router.get('/dogs', async (req, res, next) => {
    try {
      dbContext.Animal.find({})
        .populate('organization')
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

module.exports = getDogs;
