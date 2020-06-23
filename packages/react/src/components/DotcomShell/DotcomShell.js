/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { Footer } from '../Footer';
import { Masthead } from '../Masthead';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * DotcomShell component.
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
   * Component(s) to render within the UI shell.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

  /**
   * Props for the Masthead.
   * See [`<Footer>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-footer--default) for more details.
   */
  footerProps: PropTypes.shape({
    navigation: PropTypes.shape({
      footerMenu: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          links: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string,
              url: PropTypes.string,
            })
          ),
        })
      ),
      footerThin: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          url: PropTypes.string,
        })
      ),
    }),
    type: PropTypes.oneOf(['tall', 'short']),
    langCode: PropTypes.shape({
      cc: PropTypes.string,
      lc: PropTypes.string,
    }),
    disableLocaleButton: PropTypes.bool,
    languageOnly: PropTypes.bool,
    languageItems: PropTypes.arrayOf(PropTypes.shape({})),
    languageInitialItem: PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    }),
    languageCallback: PropTypes.func,
  }),

  /**
   * Props for the Masthead.
   * See [`<Masthead>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-masthead--default) for more details.
   */
  mastheadProps: PropTypes.shape(Masthead.propTypes),
};

Footer.defaultProps = {
  footerProps: null,
  mastheadProps: null,
};

export default DotcomShell;
