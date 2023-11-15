/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const fs = require('fs');

try {
  const src = path.resolve('../styles/dist');
  const dest = path.resolve('src/internal/vendor/@carbon/styles');
  fs.cpSync(src, dest, { recursive: true });
} catch (err) {
  console.error(err);
  process.exit(1);
}
