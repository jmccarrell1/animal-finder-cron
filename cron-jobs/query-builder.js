module.exports = {
  buildAnimal: function (body) {
    return animalQuery(body);
  },
  buildTypes: function (body) {
    return typeQuery(body);
  },
  buildBreeds: function (body) {
    return breedsQuery(body);
  },
  buildOrganizations: function (body) {
    return organizationQuery(body);
  },
};

const baseUrl = 'https://api.petfinder.com';

function breedsQuery(body) {
  const url = new URL(`/v2/types/${body.type}/breeds`, baseUrl);
  appendMeta(url, body.meta);
  return url;
}

function typeQuery(body) {
  const url = new URL('/v2/types', baseUrl);
  appendMeta(url, body.meta);
  return url;
}

function animalQuery(body) {
  const url = new URL('/v2/animals', baseUrl);
  appendMeta(url, body.meta);
  appendSearch(url, body);
  return url;
}

function organizationQuery(body) {
  const url = new URL('/v2/organizations', baseUrl);
  appendMeta(url, body.meta);
  return url;
}

function appendMeta(url, meta) {
  append(url, 'page', meta.page);
  append(url, 'limit', meta.limit);
  append(url, 'sort', meta.sort);
}

function appendSearch(url, body) {
  append(url, 'id', body.id);
  append(url, 'type', body.type);
  append(url, 'size', body.size);
  append(url, 'gender', body.gender);
  append(url, 'age', body.age);
  append(url, 'organization', body.organization);
  append(url, 'good_with_children', body.good_with_children);
  append(url, 'good_with_dogs', body.good_with_dogs);
  append(url, 'good_with_cats', body.good_with_cats);
  append(url, 'location', body.location);
  append(url, 'distance', body.distance);
}

function append(url, key, value) {
  if (value) {
    url.searchParams.set(key, value);
  }
}
