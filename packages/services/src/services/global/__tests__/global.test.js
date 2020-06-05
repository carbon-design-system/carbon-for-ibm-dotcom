/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AnalyticsAPI } from '../../Analytics';
import { DDOAPI } from '../../DDO';
import { globalInit } from '../';

jest.mock('../../DDO', () => ({
  DDOAPI: {
    setVersion: jest.fn(async () => {}),
  },
}));
jest.mock('../../Analytics', () => ({
  AnalyticsAPI: {
    initAll: jest.fn(),
  },
}));

describe('Global init function', () => {
  it('should execute the DDO settings', () => {
    globalInit();
    expect(DDOAPI.setVersion).toHaveBeenCalled();
  });

  it('should execute the AnalyticsAPI initAll', () => {
    globalInit();
    expect(AnalyticsAPI.initAll).toHaveBeenCalled();
  });
});
