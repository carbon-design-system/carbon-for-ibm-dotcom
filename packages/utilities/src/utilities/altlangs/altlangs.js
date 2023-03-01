/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import root from 'window-or-global';

/**
 * Utility to grab all alternative languages on the page. this scrapes the page
 * of all <link rel="alternate" hreflang="" href="" /> elements and returns
 * as a readable object
 *
 * @example
 * import { altlangs } from '@carbon/ibmdotcom-utilities';
 *
 * const langs = altlangs();
 *
 * console.log(langs); // { 'us-en': 'https://www.ibm.com/us-en', ... }
 * @returns {object} object of available languages and corresponding URLs
 */
function altlangs() {
  let links = [];
  let langs = {};
  if (root.document) {
    links = root.document.querySelectorAll('link[rel="alternate"]');

    links.forEach((link) => {
      langs[link.getAttribute('hreflang')] = link.getAttribute('href');
    });
  }

  return langs;
}

export default altlangs;
