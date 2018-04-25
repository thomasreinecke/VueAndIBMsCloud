const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('graphql-tools');
const TypeDefinitions = require('./graphql.typeDefs');
const Resolvers = require('./graphql.resolvers');
module.exports = function () {
  const app = this;
  const port = app.get('port');
  const schema = makeExecutableSchema({
    typeDefs: TypeDefinitions,
    resolvers: Resolvers.call(app)
  });
  // provide endpoint to graphql for the apollo graphql client lib
  app.use('/graphql', graphqlExpress((req) => {
    return {
      schema,
      context: {}
    };
  }));
  // provide endpoint to graphiql : the API explorer module
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`
  }));
  // define the API server here
  app.set('createSubscriptionServer', function
    createSubscriptionServer(server) {
    return new SubscriptionServer({
      execute, subscribe, schema,
      onConnect: () => { console.log('Client Connected'); },
      onDisconnect: () => { console.log('Client Disconnected'); }
    },
    {
      server, path: '/subscriptions',
    });
  });
};