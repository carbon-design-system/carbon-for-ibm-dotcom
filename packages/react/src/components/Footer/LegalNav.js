/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from 'carbon-components/es/globals/js/settings';
import Link from 'carbon-components-react/es/components/Link';

/**
 * Footer legal nav component
 *
 * @param {object} props react proptypes
 * @returns {object} JSX object
 */
const LegalNav = ({ links }) => {
  return (
    <aside
      data-autoid="footer-legal-nav"
      className={`${prefix}--legal-nav__container`}>
      <nav className={`${prefix}--legal-nav`}>
        <ul className={`${prefix}--legal-nav__list`}>
          {renderListItems(links)}
        </ul>
      </nav>
    </aside>
  );
};

/**
 * Loops through and renders list items for legal nav
 *
 * @param {Array} links A list of links to be rendered
 * @returns {object} JSX object
 */
function renderListItems(links) {
  const toRender = [];

  for (let i = 0; i < links.length; i += 1) {
    const { title, url } = links[i];

    toRender.push(
      <li className={`${prefix}--legal-nav__list-item`} key={i}>
        <Link data-autoid="footer-legal-nav__link" href={url}>
          {title}
        </Link>
      </li>
    );
  }

  return toRender;
}

LegalNav.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default LegalNav;
