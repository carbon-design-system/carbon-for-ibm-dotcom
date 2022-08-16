/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CcLcMap from './cc-lc-map';
export const getMappedValue = locale => {
  let CcLcValue = {
    cc: 'us',
    lc: 'en',
  };
  if (Object.prototype.isPrototypeOf.call(CcLcMap, locale)) {
    CcLcValue = CcLcMap[locale];
  } else if (locale.indexOf('-') > -1) {
    const splitValue = locale.split('-', 2);
    CcLcValue = {
      cc: splitValue[0],
      lc: splitValue[1],
    };
  }
  return CcLcValue;
};
