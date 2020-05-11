const express = require('express');
const router = express.Router();

function getDog(dbContext, logger) {
  router.get('/dog/:id', async (req, res, next) => {
    try {
      dbContext.Animal.findOne({ _id: req.params.id })
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

module.exports = getDog;
