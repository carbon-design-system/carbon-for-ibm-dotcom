/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import './_container.scss';
import { settings } from 'carbon-components';

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

    let bgColor = '#ffffff';
    if (
      story().props.context &&
      story().props.context.kind === '[Experimental] UI Shell'
    ) {
      bgColor = '#f3f3f3';
    }

    return (
      <React.StrictMode>
        <div
          data-floating-menu-container=""
          role="main"
          style={{
            backgroundColor: bgColor,
          }}>
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
