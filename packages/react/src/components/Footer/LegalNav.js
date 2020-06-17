/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import Link from '../../internal/vendor/carbon-components-react/components/Link/Link';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Placeholder <li/> element for injection of the TrustE cookie preferences link
 *
 * @param {number} key - the key for the JSX object
 * @returns {*} JSX object
 */
const renderTrusteItem = key => {
  return (
    <li
      className={`${prefix}--legal-nav__list-item`}
      data-autoid={`${stablePrefix}--privacy-cp`}
      key={key}
    />
  );
};

/**
 * Footer legal nav component.
 */
const LegalNav = ({ links }) => {
  if (!links || !links.length) {
    return null;
  }

  return (
    <aside
      data-autoid={`${stablePrefix}--footer-legal-nav`}
      className={`${prefix}--legal-nav__container`}>
      <nav className={`${prefix}--legal-nav`}>
        <div className={`${prefix}--legal-nav__list`}>
          {renderListItems(links)}
        </div>
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
  const renderedLinks = links.map(({ title, url }, index) => {
    if (!title || !url) {
      return null;
    }

    return (
      <li className={`${prefix}--legal-nav__list-item`} key={index}>
        <Link
          data-autoid={`${stablePrefix}--footer-legal-nav__link`}
          className={`${prefix}--footer__link`}
          href={url}>
          {title}
        </Link>
      </li>
    );
  });

  const key = renderedLinks.length + 1;
  renderedLinks.push(renderTrusteItem(key));

  const chunked_arr = [];
  let index = 0;

  while (index < renderedLinks.length) {
    chunked_arr.push(
      renderedLinks.slice(index, Math.ceil(renderedLinks.length / 3) + index)
    );
    index += Math.ceil(renderedLinks.length / 3);
  }

  return chunked_arr.map((elem, index) => {
    return (
      <ul className={`${prefix}--legal-nav__holder`} key={index}>
        {elem}
      </ul>
    );
  });
}

LegalNav.propTypes = {
  /**
   * A list of links to be rendered.
   */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

LegalNav.defaultProps = {
  links: null,
};

export default LegalNav;
