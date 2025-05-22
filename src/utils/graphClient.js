const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

const getAuthenticatedClient = () => {
    return Client.init({
        authProvider: (done) => {
            done(null, process.env.SHAREPOINT_ACCESS_TOKEN); // Pass the access token to the auth provider
        }
    });
};

module.exports = { getAuthenticatedClient };
