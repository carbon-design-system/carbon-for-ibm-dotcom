/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { Footer } from '../Footer';
import { Masthead } from '../Masthead';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * DotcomShell component
 *
 * @param {object} props react proptypes
 * @param {object} props.children Children of the Dotcom Shell
 * @param {object} props.footerNav Footer navigation object
 * @param {string} props.footerType Sets the footer type
 * @param {object} props.langCode Language code object
 * @param {object} props.navigation Masthead navigation object
 * @param {boolean} props.disableLocaleButton Disables the locale button
 * @param {object} props.mastheadProps Properties passed into the Masthead
 * @returns {*} JSX component for the Dotcom Shell
 */
const DotcomShell = ({
  children,
  footerNav,
  footerType,
  langCode,
  navigation,
  disableLocaleButton,
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
      <Footer
        navigation={footerNav}
        langCode={langCode}
        type={footerType}
        disableLocaleButton={disableLocaleButton}
      />
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
  disableLocaleButton: PropTypes.bool,
};

/**
 * @property {object} defaultProps default Footer props
 * @type {{navigation: null, mastheadProps: null, langCode: null,
 * footerNav: null, footerType: string, disableLocaleButton: boolean}}
 */
Footer.defaultProps = {
  navigation: null,
  footerNav: null,
  footerType: 'full',
  langCode: null,
  mastheadProps: null,
  disableLocaleButton: false,
};

export default DotcomShell;
