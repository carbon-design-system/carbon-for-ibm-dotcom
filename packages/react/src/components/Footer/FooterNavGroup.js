/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { AccordionItem, Link } from 'carbon-components-react';

const { prefix } = settings;

/**
 * Footer nav group component
 *
 * @param {object} props react proptypes
 * @returns {object} JSX object
 */
const FooterNavGroup = ({ isMobile, title, links }) => {
  if (isMobile) {
    return (
      <AccordionItem title={title} className={`${prefix}--footer-nav-group`}>
        <ul>{renderListItems(links, isMobile)}</ul>
      </AccordionItem>
    );
  }

  return (
    <div className={`${prefix}--footer-nav-group`}>
      <h2 className={`${prefix}--footer-nav-group__title`}>{title}</h2>
      <ul>{renderListItems(links)}</ul>
    </div>
  );
};

/**
 * Loops through and renders a list of links for footer nav group
 *
 * @param {Array} links A list of links to be rendered
 * @param {boolean} isMobile pass in type for situational className
 * @returns {object} JSX object
 */
function renderListItems(links, isMobile) {
  const toRender = [];

  for (let i = 0; i < links.length; i += 1) {
    const { url, title } = links[i];

    toRender.push(
      <li className={!isMobile ? `${prefix}--footer-nav-group__link` : null}>
        <Link href={url}>{title}</Link>
      </li>
    );
  }

  return toRender;
}

FooterNavGroup.propTypes = {
  isMobile: PropTypes.bool,
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default FooterNavGroup;
