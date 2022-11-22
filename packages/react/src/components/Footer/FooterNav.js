/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Accordion from '../../internal/vendor/carbon-components-react/components/Accordion/Accordion';
import cx from 'classnames';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import FooterNavGroup from './FooterNavGroup';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Footer nav component.
 */
const FooterNav = ({ groups, disableLocaleButton }) => {
  if (!groups?.length) {
    return null;
  }

  return (
    <nav
      data-autoid={`${stablePrefix}--footer-nav`}
      aria-label="Footer navigation"
      className={cx(`${prefix}--footer-nav`, {
        [`${prefix}--footer-nav__locale-button--disabled`]: disableLocaleButton,
      })}
    >
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

FooterNav.propTypes = {
  /**
   * Update the CSS selectors depending on the locale button being rendered or not.
   */
  disableLocaleButton: PropTypes.bool,

  /**
   * A list of groups to be rendered.
   */
  groups: PropTypes.arrayOf(
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
};

FooterNav.defaultProps = {
  groups: null,
  disableLocaleButton: false,
};

export default FooterNav;
