require('./mongoose');

const AnimalDbContext = {
  Animal: require('./models/animal'),
  Organization: require('./models/organization'),
};

module.exports = AnimalDbContext;
