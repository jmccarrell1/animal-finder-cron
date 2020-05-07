const logger = (module.exports = require('winston'));
logger.level = 'debug';
logger.format(
  logger.format.combine(
    logger.format.timestamp(),
    logger.format.printf(({ level, message, timestamp }) => {
      return `${timestamp}: ${level}: ${message}`;
    })
  )
);

logger.add(
  new logger.transports.File({
    filename: 'animal-service.log',
    level: 'info',
    maxsize: '104857600',
    maxFiles: 5,
    tailable: 'true',
    handleExceptions: true,
    humanReadableUnhandledException: true,
    json: false,
  })
);

logger.add(
  new logger.transports.Console({
    name: 'debug-console',
    level: 'debug',
    handleExceptions: true,
    humanReadableUnhandledException: true,
    stderrLevels: ['error'],
    exitOnErro: true,
  })
);
