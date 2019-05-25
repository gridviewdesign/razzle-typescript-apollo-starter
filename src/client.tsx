import { ApolloProvider } from 'react-apollo-hooks';
import React, { Fragment } from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import client from './utils/apollo-client';
import GlobalStyle from './utils/global-styles';
import { ThemeProvider } from 'styled-components';
import theme from './utils/theme';

declare global {
  interface Window {
    __APOLLO_STATE__: any;
  }
}

hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Fragment>
          <App />
          <GlobalStyle />
        </Fragment>
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
