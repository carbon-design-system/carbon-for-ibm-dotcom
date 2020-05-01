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
 * @param {object} props.footerProps Properties passed into the Footer
 * @param {object} props.mastheadProps Properties passed into the Masthead
 * @returns {*} JSX component for the Dotcom Shell
 */
const DotcomShell = ({ children, footerProps, mastheadProps }) => {
  return (
    <>
      <Masthead {...mastheadProps} />
      <div
        data-autoid={`${stablePrefix}--dotcom-shell`}
        className={`${prefix}--dotcom-shell`}>
        <div
          data-autoid={`${stablePrefix}--dotcom-shell__content`}
          className={`${prefix}--dotcom-shell__content`}>
          {children}
        </div>
      </div>
      <Footer {...footerProps} />
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
  footerProps: PropTypes.oneOf(PropTypes.shape(Footer.propTypes)),
  mastheadProps: PropTypes.oneOf(PropTypes.shape(Masthead.propTypes)),
};

/**
 * @property {object} defaultProps default DotcomShell props
 * @type {{footerProps: null, mastheadProps: null}}
 */
Footer.defaultProps = {
  footerProps: null,
  mastheadProps: null,
};

export default DotcomShell;
