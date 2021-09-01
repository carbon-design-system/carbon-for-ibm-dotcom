/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import apiResponse from '../../../../services/src/services/KalturaPlayer/__tests__/data/response.json';

module.exports = {
  getThumbnailUrl: jest.fn(() => {
    return 'https://cdnsecakmi.kaltura.com/p/123456/thumbnail/entry_id/1_9h94wo6b/width/320';
  }),
  api: jest.fn(() => Promise.resolve(apiResponse)),
  getMediaDuration: jest.fn(() => {
    return '(1:00)';
  }),
  fireEvent: jest.fn(() => {}),
  embedMedia: jest.fn(() => Promise.resolve()),
};
