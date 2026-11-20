/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Config for `cypress-cloud`, which records and parallelizes the e2e run against
 * a sorry-cypress director. The director URL is provided by `CURRENTS_API_URL`
 * and the record key is passed on the command line with `--key`.
 */
module.exports = {
  projectId: 'carbon-for-ibmdotcom-wc',
  recordKey: process.env.CURRENTS_RECORD_KEY || 'carbon-for-ibm-dotcom-wc',
  cloudServiceUrl: process.env.CURRENTS_API_URL,
};
