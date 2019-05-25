import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

import { graphQLEndpoint } from '../config/urls';

declare global {
  interface Window {
    __APOLLO_STATE__: any;
  }
}

export default new ApolloClient({
  connectToDevTools: process.browser,
  ssrMode: !process.browser,
  link: new HttpLink({
    uri: graphQLEndpoint,
  }),
  cache: process.browser
    ? new InMemoryCache().restore(window.__APOLLO_STATE__)
    : new InMemoryCache(),
});
