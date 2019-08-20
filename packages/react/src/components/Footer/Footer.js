/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { localeSelector } from '../../internal/FeatureFlags';
import LocaleSelector from './LocaleSelector';

/**
 * Test async/await function
 *
 * @param {number} ms timer in milliseconds
 * @returns {Promise} Promise object with setTimeout
 */
async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

/** Footer component */
class Footer extends React.Component {
  /**
   * Test await function
   *
   * @returns {Promise} Await function
   */
  async test() {
    await wait(500);
  }

  /**
   * Renders the footer component
   *
   * @returns {object} JSX object
   */
  render() {
    return (
      <footer>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        {localeSelector ? (
          <LocaleSelector text="Load the Locale Selector!" />
        ) : null}
      </footer>
    );
  }
}

export default Footer;
