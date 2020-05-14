/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Accordion } from 'carbon-components-react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import FooterNavGroup from './FooterNavGroup';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Footer nav component
 *
 * @param {object} props react proptypes
 * @returns {object} JSX object
 */
const FooterNav = ({ groups }) => {
  if (!groups?.length) {
    return null;
  }

  return (
    <nav
      data-autoid={`${stablePrefix}--footer-nav`}
      className={`${prefix}--footer-nav`}>
      <Accordion className={`${prefix}--footer-nav__container`}>
        {renderGroups(groups)}
      </Accordion>
    </nav>
  );
};

/**
 * Loops through and renders a list of nav groups for the footer nav
 *
 * @param {Array} groups A list of groups to be rendered
 * @returns {object} JSX object
 */
function renderGroups(groups) {
  return groups.map(({ title, links }, index) => (
    <FooterNavGroup title={title} links={links} key={index} />
  ));
}

/**
 * @property {object} propTypes FooterNav propTypes
 * @description Defined property types for component
 * @type {{groups: Array}}
 */
FooterNav.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      links: PropTypes.array,
    })
  ),
};

/**
 * @property {object} defaultProps default FooterNav props
 * @type {{groups: Array}}
 */
FooterNav.defaultProps = {
  groups: null,
};

export default FooterNav;
