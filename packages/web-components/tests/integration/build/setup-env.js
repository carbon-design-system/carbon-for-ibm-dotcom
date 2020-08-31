/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const testTimeoutEnv = Number(process.env.DDS_BUILD_INTEGRATION_TEST_TIMEOUT);
const testTimeout = isNaN(testTimeoutEnv) ? 30000 : testTimeoutEnv;
jest.setTimeout(testTimeout);
page.setDefaultNavigationTimeout(testTimeout);
