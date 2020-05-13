const app = require('./app');
const logger = require('./modules/logger');

let port = 3001;

app.listen(port, () => {
  logger.info(`Server hooked up on port ${port}`);
});
