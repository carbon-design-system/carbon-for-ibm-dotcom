const express = require('express');
const next = require('next');
const path = require('path');
const url = require('url');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8080;

const nextApp = next({ dir: '.', dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = express();

  // Static files
  // https://github.com/zeit/next.js/tree/4.2.3#user-content-static-file-serving-eg-images
  server.use(
    '/static',
    express.static(path.join(__dirname, 'static'), {
      maxAge: dev ? '0' : '365d',
    })
  );

  // Homepage route
  server.get('/', (req, res) => {
    return nextApp.render(req, res, '/', req.query);
  });

  // Default catch-all renders Next app
  server.get('*', (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    nextHandler(req, res, parsedUrl);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`Listening on http://localhost:${port}`);
  });
});
