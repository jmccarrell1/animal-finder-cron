require('./mongoose');

const Context = {
  Animal: require('./models/animal'),
  Type: require('./models/type'),
  Organization: require('./models/organization'),
};

module.exports = Context;
