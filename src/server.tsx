import { ApolloProvider, getMarkupFromTree } from 'react-apollo-hooks';
import express from 'express';
import 'isomorphic-fetch';
import React, { Fragment } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet } from 'styled-components';
import App from './App';
import client from './utils/apollo-client';
import Global from './utils/global-styles';
//  import { Helmet } from 'react-helmet'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
const context = {};

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/feed', async (req, res) => {
    try {
      res.type('application/xml');
    } catch (e) {
      console.log(e);
    }
  })
  .get('/*', async (req, res) => {
    const sheet = new ServerStyleSheet();
    const Root = () => (
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <Fragment>
            <App />
            <Global />
          </Fragment>
        </StaticRouter>
      </ApolloProvider>
    );

    await getMarkupFromTree({
      renderFunction: renderToString,
      tree: <Root />,
    });
    const initialApolloState = client.extract();

    // chaning intial state as per requirement
    // initialApolloState.ROOT_QUERY.mode = themeMode

    // initialApolloState.ROOT_QUERY.favorites.json =
    //     'favorites__awesome-talks' in req.cookies
    //         ? JSON.parse(req.cookies['favorites__awesome-talks'])
    //         : []

    // initialApolloState.ROOT_QUERY.watched.json =
    //     'watched__awesome-talks' in req.cookies
    //         ? JSON.parse(req.cookies['watched__awesome-talks'])
    //         : []

    // When the app is rendered collect the styles that are used inside it
    const markup = renderToString(sheet.collectStyles(<Root />));

    // Generate all the style tags so they can be rendered into the page
    const styleTags = sheet.getStyleTags();
    // const helmet = Helmet.renderStatic()

    res.send(
      // prettier-ignore
      `<!doctype html>
    <html lang="en" >
    <head>

        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="@NikkitaFTW">
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-37411302-9"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-37411302-9');
        </script>
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
        <!-- Render the style tags gathered from the components into the DOM -->
${styleTags}

    </head>
    <body >
        <div id="root">${markup}</div>
        <script>
        window.__APOLLO_STATE__ = ${
          JSON.stringify(initialApolloState)
          .replace(/</g, '\\u003c')
        }
      </script>
    </body>
</html>`
    );
  });

export default server;
