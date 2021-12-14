#!/usr/bin/env node

/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const pkg = require('../../../package.json');

/**
 * This resets the `version.html` file under /app back to the `{{version}}`
 * replacement text. This essentially undos the action in `set-version.js`.
 */
function replaceVersion() {
  const versionFile = './tests/cdn-build/app/version.html';

  const data = fs.readFileSync(versionFile, {
    encoding: 'utf8',
  });

  const packageVersionString = new RegExp(pkg.version, 'g');

  const result = data.replace(packageVersionString, '{{version}}');

  fs.writeFileSync(versionFile, result);
}

replaceVersion();
