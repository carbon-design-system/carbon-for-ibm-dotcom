/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { localeSelector } from '../../internal/FeatureFlags';
// import LocaleSelector from './LocaleSelector';
import { settings } from 'carbon-components';
import classNames from 'classnames';
import LegalNav from './LegalNav';

const { prefix } = settings;

/** Footer component */
class Footer extends React.Component {
  /**
   * Renders the footer component
   *
   * @returns {object} JSX object
   */
  render() {
    return (
      <footer className={classNames(`${prefix}--footer`, this.getFooterType())}>
        <LegalNav
          items={[
            { title: 'Contact IBM', url: '#' },
            { title: 'Privacy', url: '#' },
            { title: 'Terms of use', url: '#' },
            { title: 'Accessibility', url: '#' },
            { title: 'Feedback', url: '#' },
            { title: 'Cookie preferences', url: '#' },
          ]}
        />
      </footer>
    );
  }

  /**
   * gets the footer type
   *
   * @returns {object} JSX object
   */
  getFooterType() {
    let typeClassName;

    if (this.props.type === 'short') {
      typeClassName = `${prefix}--footer--short`;
    }

    return typeClassName;
  }
}

Footer.propTypes = {
  type: PropTypes.string,
};

export default Footer;

// api for reference later
// https://www.ibm.com/common/v18/js/data/usen.js
