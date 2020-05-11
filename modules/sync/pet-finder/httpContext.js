const axios = require('axios');
const baseUrl = 'https://api.petfinder.com';

function getAnimalUrl(params, id) {
  const path = id === undefined ? '/v2/animals' : `/v2/animals/${id}`;
  const url = new URL(path, baseUrl);
  appendMeta(url, params.meta);
  appendSearch(url, params);
  return url;
}

async function HttpAnimal(params) {
  const url = getAnimalUrl(params);

  return {
    url: url,
    get: async function () {
      return await axios.get(url.href, url);
    },
  };
}

function getOrganizationUrl(params) {
  const path =
    params.external_organization_id === undefined
      ? '/v2/organizations'
      : `/v2/organizations/${params.external_organization_id}`;
  const url = new URL(path, baseUrl);
  appendMeta(url, params.meta);
  return url;
}

async function HttpOrganization(params) {
  const url = getOrganizationUrl(params);

  return {
    url: url,
    get: async function () {
      return await axios.get(url.href, url);
    },
  };
}

function append(url, key, value) {
  if (value) {
    url.searchParams.set(key, value);
  }
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

module.exports = { HttpAnimal, HttpOrganization };
