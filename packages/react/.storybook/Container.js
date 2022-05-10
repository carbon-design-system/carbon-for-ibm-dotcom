/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { Component } from 'react';
import './_container.scss';
import { settings } from 'carbon-components';

/**
 * @param {Element} elem An element.
 * @param {string[]} props CSS property names.
 * @returns {object<string, any>}
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
    const params = new URLSearchParams(window.location.search);

    if (params.has('theme')) {
      const theme = params.get('theme');
      document.body.classList.add(`dds-theme-zone-${theme}`);
    }

    if (typeof STORYBOOK_USE_RTL !== 'undefined' && STORYBOOK_USE_RTL) {
      document.documentElement.dir = 'rtl';
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    }
  }

  render() {
    const { parameters, story } = this.props;
    const classes = cx({
      'storybook-proxy-story': parameters.proxy,
    });

    return (
      <React.StrictMode>
        <div data-floating-menu-container="" role="main" className={classes}>
          {story()}
        </div>
      </React.StrictMode>
    );
  }
}
