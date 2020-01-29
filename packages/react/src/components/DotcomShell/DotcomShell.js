/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Footer } from '../Footer';
import { Masthead } from '../Masthead';
import PropTypes from 'prop-types';
import React from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * DotcomShell component
 *
 * @typedef {object} navigation Object containing navigation elements
 * @param {string} User content
 * @returns {*} DotcomShell component
 */
const DotcomShell = ({
  children,
  footerNav,
  footerType,
  langCode,
  navigation,
  ...mastheadProps
}) => {
  return (
    <>
      <Masthead navigation={navigation} {...mastheadProps} />
      <div
        data-autoid={`${stablePrefix}--dotcom-shell`}
        className={`${prefix}--dotcom-shell`}>
        <div
          data-autoid={`${stablePrefix}--dotcom-shell__content`}
          className={`${prefix}--dotcom-shell__content`}>
          {children}
        </div>
      </div>
      <Footer navigation={footerNav} langCode={langCode} type={footerType} />
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
  navigation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  footerNav: PropTypes.object,
  footerType: PropTypes.string,
  langCode: PropTypes.object,
  mastheadProps: PropTypes.object,
};

export default DotcomShell;
