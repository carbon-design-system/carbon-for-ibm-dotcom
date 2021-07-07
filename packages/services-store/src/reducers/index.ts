/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { combineReducers } from 'redux';
import localeAPIReducer from './localeAPI';
import translateAPIReducer from './translateAPI';
import profileAPIReducer from './profileAPI';
import searchAPIReducer from './searchAPI';
import videoPlayerAPIReducer from './videoPlayerAPI';
import cloudAccountAuthAPIReducer from './cloudAccountAuthAPI';

export { localeAPIReducer as localeAPI, translateAPIReducer as translateAPI, profileAPIReducer as profileAPI };

/**
 * The combined reducer for all APIs.
 */
const reducers = combineReducers({
  localeAPI: localeAPIReducer,
  translateAPI: translateAPIReducer,
  profileAPI: profileAPIReducer,
  searchAPI: searchAPIReducer,
  videoPlayerAPI: videoPlayerAPIReducer,
  cloudAccountAuthAPI: cloudAccountAuthAPIReducer,
});

export default reducers;
