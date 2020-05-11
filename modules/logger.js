const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(label({ label: 'cron' }), timestamp(), myFormat),
});

logger.add(
  new transports.File({
    filename: 'animal-service.log',
    level: 'info',
    maxsize: '104857600',
    maxFiles: 5,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    format: format.json(),
  })
);

logger.add(
  new transports.Console({
    name: 'debug-console',
    level: 'debug',
    handleExceptions: true,
    humanReadableUnhandledException: true,
    stderrLevels: ['error'],
    exitOnErro: true,
    format: format.combine(format.colorize(), format.simple()),
  })
);

module.exports = logger;
