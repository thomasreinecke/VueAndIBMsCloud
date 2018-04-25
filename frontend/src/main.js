import Vue from 'vue'
import App from './App'
import router from './router'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import VueApollo from 'vue-apollo'
// add unified ressource identifiers for Dev and Prod (IBM Cloud)
const uris = {
  dev: 'localhost:3030',
  prod: 'vueandibmscloud-api.mybluemix.net'
}
// setup httpLink depending on environment
const httpLink = new HttpLink({
  uri: (window.location.hostname === 'localhost') ? `http://${uris.dev}/graphql` : `https://${uris.prod}/graphql`
  })
// setup web socket link depending on environment
const wsLink = new WebSocketLink({
  uri: (window.location.hostname === 'localhost') ? `ws://${uris.dev}/subscriptions` : `wss://${uris.prod}/subscriptions`,
  options: {
    reconnect: true
  }
})
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)
// define the apolloClient
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
})
Vue.use(VueApollo)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider,
  router,
  render: h => h(App)
})