/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const specContext = require.context('.', true, /_a11y-check\.js$/);
specContext.keys().forEach(specContext);
