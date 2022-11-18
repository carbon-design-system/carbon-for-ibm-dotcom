/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import AccordionItem from '../../internal/vendor/carbon-components-react/components/Accordion/AccordionItem';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import Link from '../../internal/vendor/carbon-components-react/components/Link/Link';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Footer nav group component.
 */
const FooterNavGroup = ({ title, links }) => {
  if (!title || !links?.length) {
    return null;
  }

  return (
    <AccordionItem
      data-autoid={`${stablePrefix}--footer-nav-group`}
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
  return links.map(({ title, url }, index) => {
    if (!title || !url) {
      return null;
    }

    return (
      <li className={`${prefix}--footer-nav-group__item`} key={index}>
        <Link
          className={`${prefix}--footer-nav-group__link ${prefix}--footer__link`}
          data-autoid={`${stablePrefix}--footer-nav-group__link`}
          href={url}>
          {title}
        </Link>
      </li>
    );
  });
}

FooterNavGroup.propTypes = {
  /**
   * The title.
   */
  title: PropTypes.string,

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

FooterNavGroup.defaultProps = {
  title: null,
  links: null,
};

export default FooterNavGroup;
