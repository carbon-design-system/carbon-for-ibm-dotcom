/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { localeSelector } from '../../internal/FeatureFlags';
import LocaleSelector from './LocaleSelector';

/** Footer component */
class Footer extends React.Component {
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
