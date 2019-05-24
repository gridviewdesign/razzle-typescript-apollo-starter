import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

declare global {
  interface Window {
    __APOLLO_STATE__: any;
  }
}

const client = new ApolloClient({
  cache: process.browser
    ? new InMemoryCache().restore(window.__APOLLO_STATE__)
    : new InMemoryCache(),
  connectToDevTools: process.browser,
  link: new HttpLink({
    uri: 'https://gql-placeholder.herokuapp.com/graphql',
  }),
  ssrMode: !process.browser,
});

export default client;
