/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import root from 'window-or-global';
import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers/index';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
}

/**
 * @param initialState The initial state.
 * @returns The default Redux store for Carbon for IBM.com.
 */
export function createStore(initialState = root.__PRELOADED_STATE__) {
  return reduxCreateStore(
    reducers,
    initialState ?? {},
    applyMiddleware(...middlewares)
  );
}

const store = createStore();
export default store;
