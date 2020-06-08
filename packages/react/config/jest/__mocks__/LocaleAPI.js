/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mocklist from '../../../src/components/Footer/__data__/locale-list';

module.exports = {
  getLocale: jest.fn(() => Promise.resolve({ cc: 'us', lc: 'en' })),
  getList: jest.fn(() => Promise.resolve(mocklist)),
};
