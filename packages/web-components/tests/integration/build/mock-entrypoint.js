/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import translation from './data/translation.json';
import localeList from './data/locale-list.json';

const mock = new MockAdapter(axios);
mock.onGet(/common\/v18\/js\/data\/jsononly/).reply(200, translation);
mock.onGet(/common\/js\/dynamicnav\/www\/countrylist\/jsononly/).reply(200, localeList);
