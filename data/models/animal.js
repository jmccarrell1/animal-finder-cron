const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  id: {
    type: 'Number',
  },
  organization_id: {
    type: 'String',
  },
  url: {
    type: 'String',
  },
  type: {
    type: 'String',
  },
  species: {
    type: 'String',
  },
  breeds: {
    primary: {
      type: 'String',
    },
    secondary: {
      type: 'Mixed',
    },
    mixed: {
      type: 'Boolean',
    },
    unknown: {
      type: 'Boolean',
    },
  },
  colors: {
    primary: {
      type: 'String',
    },
    secondary: {
      type: 'Mixed',
    },
    tertiary: {
      type: 'Mixed',
    },
  },
  age: {
    type: 'String',
  },
  gender: {
    type: 'String',
  },
  size: {
    type: 'String',
  },
  coat: {
    type: 'String',
  },
  attributes: {
    spayed_neutered: {
      type: 'Boolean',
    },
    house_trained: {
      type: 'Boolean',
    },
    declawed: {
      type: 'Mixed',
    },
    special_needs: {
      type: 'Boolean',
    },
    shots_current: {
      type: 'Boolean',
    },
  },
  environment: {
    children: {
      type: 'Boolean',
    },
    dogs: {
      type: 'Boolean',
    },
    cats: {
      type: 'Mixed',
    },
  },
  tags: {
    type: 'Array',
  },
  name: {
    type: 'String',
  },
  description: {
    type: 'String',
  },
  photos: {
    type: ['Mixed'],
  },
  primary_photo_cropped: {
    small: {
      type: 'String',
    },
    medium: {
      type: 'String',
    },
    large: {
      type: 'String',
    },
    full: {
      type: 'String',
    },
  },
  videos: {
    type: 'Array',
  },
  status: {
    type: 'String',
  },
  status_changed_at: {
    type: 'Date',
  },
  published_at: {
    type: 'Date',
  },
  distance: {
    type: 'Number',
  },
  contact: {
    email: {
      type: 'String',
    },
    phone: {
      type: 'Mixed',
    },
    address: {
      address1: {
        type: 'Mixed',
      },
      address2: {
        type: 'Mixed',
      },
      city: {
        type: 'String',
      },
      state: {
        type: 'String',
      },
      postcode: {
        type: 'Date',
      },
      country: {
        type: 'String',
      },
    },
  },
  _links: {
    self: {
      href: {
        type: 'String',
      },
    },
    type: {
      href: {
        type: 'String',
      },
    },
    organization: {
      href: {
        type: 'String',
      },
    },
  },
});

const Animal = mongoose.model('Animal', AnimalSchema);
module.exports = Animal;
