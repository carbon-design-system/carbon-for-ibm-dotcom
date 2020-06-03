/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const _host = 'https://ibm.com';
const _version = 'v1';

process.env.CORS_PROXY = process.env.CORS_PROXY || 'https://myproxy.com/';
process.env.REACT_APP_CORS_PROXY =
  process.env.REACT_APP_CORS_PROXY || 'https://cra-myproxy.com/';
process.env.SEARCH_TYPEAHEAD_HOST = process.env.SEARCH_TYPEAHEAD_HOST || _host;
process.env.SEARCH_TYPEAHEAD_VERSION =
  process.env.SEARCH_TYPEAHEAD_VERSION || _version;
process.env.MARKETING_SEARCH_HOST = process.env.MARKETING_SEARCH_HOST || _host;
process.env.MARKETING_SEARCH_VERSION =
  process.env.MARKETING_SEARCH_VERSION || _version;
process.env.PROFILE_HOST = process.env.PROFILE_HOST || _host;
process.env.PROFILE_VERSION = process.env.PROFILE_VERSION || _version;
process.env.TRANSLATION_HOST = process.env.TRANSLATION_HOST || _host;
