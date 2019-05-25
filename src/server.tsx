import express from 'express';
import 'isomorphic-fetch';
import React, { Fragment } from 'react';
import { ApolloProvider, getMarkupFromTree } from 'react-apollo-hooks';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet } from 'styled-components';
import App from './App';
import client from './utils/apollo-client';
import Global from './utils/global-styles';
import { ThemeProvider } from 'styled-components';
import theme from './utils/theme';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
const context = {};

const googleTagManagerID = 'UA-37411302-9';
const twitterUserName = '@brandonjcreek';

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
          <ThemeProvider theme={theme}>
            <Fragment>
              <App />
              <Global />
            </Fragment>
          </ThemeProvider>
        </StaticRouter>
      </ApolloProvider>
    );

    const renderedHTML = await getMarkupFromTree({
      renderFunction: renderToString,
      tree: <Root />,
    });

    // When the app is rendered collect the styles that are used inside it
    const styleTags = sheet.getStyleTags();
    const initialApolloState = client.extract();
    const helmet = Helmet.renderStatic();

    res.send(
      // prettier-ignore
      `<!doctype html>
          <html lang="en" ${helmet.htmlAttributes.toString()}>
          <head>
              ${helmet.title.toString()}
              ${helmet.meta.toString()}
              ${helmet.link.toString()}
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charSet='utf-8' />
              <meta name="viewport" content="width=device-width,initial-scale=1">
              <meta name="mobile-web-app-capable" content="yes">
              <meta name="apple-mobile-web-app-capable" content="yes">
              <meta name="twitter:card" content="summary">
              <meta name="twitter:site" content="@${twitterUserName}">
              <!-- Global site tag (gtag.js) - Google Analytics -->
              <script async src="https://www.googletagmanager.com/gtag/js?id=${googleTagManagerID}"></script>
              <script>
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleTagManagerID}');
              </script>
              ${assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ''}
              ${process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`}
              <!-- Render the style tags gathered from the components into the DOM -->
              ${styleTags}
          </head>
          <body >
              ${helmet.bodyAttributes.toString()}
              <div id="root">${renderedHTML}</div>
              <script>window.__APOLLO_STATE__ = 
              ${JSON.stringify(initialApolloState).replace(/</g, '\\u003c')}
              </script>
          </body>
      </html>`
    );
  });

export default server;
