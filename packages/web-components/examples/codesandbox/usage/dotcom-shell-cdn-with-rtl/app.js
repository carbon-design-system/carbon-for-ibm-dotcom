/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const acceptLanguageParser = require('accept-language-parser');
const express = require('express');
const Handlebars = require('handlebars');
const rtlDetect = require('rtl-detect');

const readFile = promisify(fs.readFile);
const templateCache = {};
const templateFile = path.resolve(__dirname, 'index.hbs');

const app = express();

app.get('/', async function topRoute(req, res) {
  // Determins user's preferred language
  const { code, region } = acceptLanguageParser.parse(req.headers['accept-language'])[0];
  const dir = !rtlDetect.isRtlLang(code) ? 'ltr' : 'rtl';
  // Renders the Handlebars template from the data
  if (!templateCache[templateFile]) {
    templateCache[templateFile] = Handlebars.compile(await readFile(templateFile, 'utf8'));
  }
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'public, max-age=0');
  res.send(
    templateCache[templateFile]({
      dir,
      dirSuffix: dir !== 'rtl' ? '' : '.rtl',
      lang: !region ? code : `${code}-${region}`,
    })
  );
  res.end();
});

const PORT = 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}.`);
});
