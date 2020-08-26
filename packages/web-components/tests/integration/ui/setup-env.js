/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const testTimeout = Number(process.env.DDS_UI_INTEGRATION_TEST_TIMEOUT);
jest.setTimeout(isNaN(testTimeout) ? 30000 : testTimeout);
