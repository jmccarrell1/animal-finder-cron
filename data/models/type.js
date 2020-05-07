const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
  name: {
    type: 'String',
  },
  coats: {
    type: ['String'],
  },
  colors: {
    type: ['String'],
  },
  genders: {
    type: ['String'],
  },
  _links: {
    self: {
      href: {
        type: 'String',
      },
    },
    breeds: {
      href: {
        type: 'String',
      },
    },
  },
});

const Type = mongoose.model('Type', TypeSchema);
module.exports = Type;
