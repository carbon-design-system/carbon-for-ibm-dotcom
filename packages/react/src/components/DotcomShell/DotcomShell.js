/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { Content } from 'carbon-components-react';
import { Masthead, MastheadL1, Footer } from '@carbon/ibmdotcom-react';

const { prefix } = settings;

/**
 * DotcomShell component
 *
 * @typedef {object} navigation Object containing navigation elements
 * @param {string} User content
 * @returns {*} DotcomShell component
 */
const DotcomShell = ({ navigation, children }) => {
  return (
    <>
      <div className={`${prefix}--grid ${prefix}--dotcom-shell`}>
        <div className={`${prefix}--dotcom-shell__masthead`}>
          <>
            <Masthead navigation={navigation} />
            <MastheadL1 />
          </>
        </div>
        <Content
          id={`${prefix}--dotcom-shell__content`}
          className={`${prefix}--grid`}
          style={{
            paddingTop: '80px',
            paddingBottom: '80px',
            flex: '1',
          }}>
          {children}
        </Content>
      </div>
      <Footer />
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
};

export default DotcomShell;
