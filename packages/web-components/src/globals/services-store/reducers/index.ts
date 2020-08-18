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
import profileAPIReducer from './profileAPI';

export { localeAPIReducer as localeAPI, translateAPIReducer as translateAPI, profileAPIReducer as profileAPI };

/**
 * The combined reducer of one for `LocaleAPI`, one for `TranslateAPI`. and one for `ProfileAPI`.
 */
const reducers = combineReducers({
  localeAPI: localeAPIReducer,
  translateAPI: translateAPIReducer,
  profileAPI: profileAPIReducer,
});

export default reducers;
