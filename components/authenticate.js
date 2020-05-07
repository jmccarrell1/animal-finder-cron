const axios = require('axios');

async function authenticate() {
  const response = await axios.post(
    process.env.AUTH_TOKEN_URL,
    {
      grant_type: process.env.AUTH_GRANT_TYPE,
      client_id: process.env.AUTH_CLIENT_ID,
      client_secret: process.env.AUTH_CLIENT_SECRET,
    },
    {
      headers: { 'content-type': 'application/json' },
    }
  );

  if (response) {
    if (response.data.access_token) {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + response.data.access_token;
    }
  }
}

module.exports = authenticate;
