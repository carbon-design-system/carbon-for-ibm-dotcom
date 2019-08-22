/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from 'carbon-components/es/globals/js/settings';
import AccordionItem from 'carbon-components-react/es/components/AccordionItem';
import Link from 'carbon-components-react/es/components/Link';

/**
 * Footer nav group component
 *
 * @param {object} props react proptypes
 * @returns {object} JSX object
 */
const FooterNavGroup = ({ title, links }) => {
  return (
    <AccordionItem
      data-autoid="footer-nav-group"
      title={title}
      className={`${prefix}--footer-nav-group`}>
      <h2 className={`${prefix}--footer-nav-group__title`}>{title}</h2>
      <ul>{renderListItems(links)}</ul>
    </AccordionItem>
  );
};

/**
 * Loops through and renders a list of links for footer nav group
 *
 * @param {Array} links A list of links to be rendered
 * @returns {object} JSX object
 */
function renderListItems(links) {
  const toRender = [];

  for (let i = 0; i < links.length; i += 1) {
    const { url, title } = links[i];

    toRender.push(
      <li className={`${prefix}--footer-nav-group__item`} key={i}>
        <Link
          className={`${prefix}--footer-nav-group__link`}
          data-autoid="footer-nav-group__link"
          href={url}>
          {title}
        </Link>
      </li>
    );
  }

  return toRender;
}

FooterNavGroup.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default FooterNavGroup;
