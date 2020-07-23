/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { combineReducers } from 'redux';
import localeAPIReducer from './localeAPI';
import translateAPIReducer from './translateAPI';

/**
 * The combined reducer of one for `LocaleAPI` and one for `TranslateAPI`.
 */
const reducers = combineReducers({
  localeAPI: localeAPIReducer,
  translateAPI: translateAPIReducer,
});

export default reducers;
