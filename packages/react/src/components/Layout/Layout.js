/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { init } from '../../global';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * DotcomShell component
 *
 * @typedef {object} navigation Object containing navigation elements
 * @param {string} User content
 * @returns {*} DotcomShell component
 */
const Layout = ({ children }) => {
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div
        data-autoid={`${stablePrefix}--dotcom-shell`}
        className={`${prefix}--dotcom-shell`}>
        <div
          data-autoid={`${stablePrefix}--dotcom-shell__content`}
          className={`${prefix}--dotcom-shell__content`}>
          {children}
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  /**
   * User content
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
