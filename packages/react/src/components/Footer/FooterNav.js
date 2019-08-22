/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from 'carbon-components/es/globals/js/settings';
import Accordion from 'carbon-components-react/es/components/Accordion';
import FooterNavGroup from './FooterNavGroup';

/**
 * Footer nav component
 *
 * @param {object} props react proptypes
 * @returns {object} JSX object
 */
const FooterNav = ({ groups }) => {
  return (
    <nav data-autoid="footer-nav" className={`${prefix}--footer-nav`}>
      <div className={`${prefix}--footer-nav__container`}>
        <Accordion>{renderGroups(groups)}</Accordion>
      </div>
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

FooterNav.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      links: PropTypes.array.isRequired,
    }).isRequired
  ).isRequired,
};

export default FooterNav;
