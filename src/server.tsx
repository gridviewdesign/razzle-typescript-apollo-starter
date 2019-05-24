import 'isomorphic-fetch';
import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { getDataFromTree, ApolloProvider } from 'react-apollo';

import client from './utils/apollo-client';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    interface Context {
      url?: string;
    }
    const context: Context = {};

    const HTML = () => (
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    );

    await getDataFromTree(<HTML />).catch(err => console.log(err));

    const initialApolloState = client.extract();

    const markup = renderToString(<HTML />);

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
        window.__APOLLO_STATE__ = ${JSON.stringify(initialApolloState).replace(
          /</g,
          '\\u003c'
        )}
      </script>
    </body>
</html>`
      );
    }
  });

export default server;
