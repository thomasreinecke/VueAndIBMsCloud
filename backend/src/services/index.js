const graphql = require('./graphql/graphql.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(graphql);
};
