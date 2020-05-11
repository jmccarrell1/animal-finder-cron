const mongoose = require('mongoose');
const logger = require('../modules/logger');

const mongoDB = process.env.MONGODB_URI;
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const connection = mongoose.connection;

connection.on('connected', () => {
  logger.info('Mongoose connection established');
});
connection.on('error', (error) => {
  logger.error(`Mongoose connection error: ${error}`);
});
connection.on('disconnected', () => {
  logger.info('Mongoose connection disconnected');
});

module.exports = connection;
