/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import apiResponse from '../../../../services/src/services/VideoPlayer/__tests__/data/response.json';

module.exports = {
  getThumbnailUrl: jest.fn(() => {
    return 'https://cdnsecakmi.kaltura.com/p/123456/thumbnail/entry_id/0_uka1msg4/width/320';
  }),
  api: jest.fn(() => Promise.resolve(apiResponse)),
  getVideoDuration: jest.fn(() => {
    return '(1:00)';
  }),
  fireEvent: jest.fn(() => {}),
  embedVideo: jest.fn(() => Promise.resolve()),
};
