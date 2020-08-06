/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import './_container.scss';
import { settings } from 'carbon-components';

/**
 * @param {Element} elem An element.
 * @param {string[]} props CSS property names.
 * @returns {Object<string, any>}
 *   The key-value pair of CSS property name/value.
 *   Used primary for integration testing.
 */
window.getStyleValues = function getStyleValues(elem, props) {
  const computedStyle = elem.ownerDocument.defaultView.getComputedStyle(elem);
  return props.reduce(
    (acc, prop) => ({
      ...acc,
      [prop]: computedStyle.getPropertyValue(prop),
    }),
    {}
  );
};

const { prefix } = settings;
export default class Container extends Component {
  componentDidMount() {
    if (process.env.REACT_STORYBOOK_USE_RTL === 'true') {
      document.documentElement.dir = 'rtl';
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    }
  }

  render() {
    const { story } = this.props;

    return (
      <React.StrictMode>
        <div data-floating-menu-container="" role="main">
          {story()}
        </div>
        <input
          aria-label="input-text-offleft"
          type="text"
          className={`${prefix}--visually-hidden`}
        />
      </React.StrictMode>
    );
  }
}
