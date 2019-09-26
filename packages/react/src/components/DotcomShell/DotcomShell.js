/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { settings } from '@carbon/ibmdotcom-utilities';
import { settings as carbonSettings } from 'carbon-components';
import { Masthead, Footer } from '@carbon/ibmdotcom-react';

const { prefix } = settings;
const cPrefix = carbonSettings.prefix;

/**
 * DotcomShell component
 *
 * @typedef {object} navigation Object containing navigation elements
 * @param {string} User content
 * @returns {*} DotcomShell component
 */
const DotcomShell = ({
  navigation,
  footerType,
  children,
  ...mastheadProps
}) => {
  return (
    <>
      <Masthead navigation={navigation} {...mastheadProps} />
      <div
        data-autoid={`${prefix}--dotcom-shell`}
        className={`${cPrefix}--dotcom-shell`}>
        <div
          data-autoid={`${prefix}--dotcom-shell__content`}
          className={`${cPrefix}--dotcom-shell__content`}>
          {children}
        </div>
      </div>
      <Footer type={footerType} />
    </>
  );
};

DotcomShell.propTypes = {
  /**
   * User content
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  navigation: PropTypes.object,
  footerType: PropTypes.string,
  mastheadProps: PropTypes.object,
};

export default DotcomShell;
