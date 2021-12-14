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
 * This replaces all instances of the text `{{version}}` in version.html with
 * the current version of Carbon for IBM.com web components.
 */
function replaceVersion() {
  const versionFile = './tests/cdn-build/app/version.html';

  const data = fs.readFileSync(versionFile, {
    encoding: 'utf8',
  });

  const result = data.replace(/{{version}}/g, pkg.version);

  fs.writeFileSync(versionFile, result);
}

replaceVersion();
