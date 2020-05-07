const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  id: {
    type: 'String',
  },
  name: {
    type: 'String',
  },
  email: {
    type: 'String',
  },
  phone: {
    type: 'String',
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
      type: 'Mixed',
    },
    country: {
      type: 'String',
    },
  },
  hours: {
    monday: {
      type: 'Mixed',
    },
    tuesday: {
      type: 'Mixed',
    },
    wednesday: {
      type: 'Mixed',
    },
    thursday: {
      type: 'Mixed',
    },
    friday: {
      type: 'Mixed',
    },
    saturday: {
      type: 'Mixed',
    },
    sunday: {
      type: 'Mixed',
    },
  },
  url: {
    type: 'String',
  },
  website: {
    type: 'String',
  },
  mission_statement: {
    type: 'String',
  },
  adoption: {
    policy: {
      type: 'Mixed',
    },
    url: {
      type: 'Mixed',
    },
  },
  social_media: {
    facebook: {
      type: 'String',
    },
    twitter: {
      type: 'Mixed',
    },
    youtube: {
      type: 'Mixed',
    },
    instagram: {
      type: 'Mixed',
    },
    pinterest: {
      type: 'Mixed',
    },
  },
  photos: {
    type: 'Array',
  },
  distance: {
    type: 'Mixed',
  },
  _links: {
    self: {
      href: {
        type: 'String',
      },
    },
    animals: {
      href: {
        type: 'String',
      },
    },
  },
});

const Organization = mongoose.model('Organization', OrganizationSchema);
module.exports = Organization;
