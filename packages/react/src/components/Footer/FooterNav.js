/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { Accordion } from 'carbon-components-react';
import classNames from 'classnames';

import FooterNavGroup from './FooterNavGroup';

const { prefix } = settings;

/** Footer nav component */
class FooterNav extends React.Component {
  /**
   * Renders the footer nav component
   *
   * @returns {object} JSX object
   */
  render() {
    const { groups } = this.props;

    return (
      <nav className={`${prefix}--footer-nav`}>
        <ul
          className={classNames(
            `${prefix}--footer-nav__list`,
            `${prefix}--footer-nav__list--desktop`
          )}>
          {this.renderGroups(groups)}
        </ul>
        <Accordion
          className={classNames(
            `${prefix}--footer-nav__list`,
            `${prefix}--footer-nav__list--mobile`
          )}>
          {this.renderMobileGroups(groups)}
        </Accordion>
      </nav>
    );
  }

  /**
   * Loops through and renders a list of nav groups for the footer nav
   *
   * @param {Array} groups A list of groups to be rendered
   * @returns {object} JSX object
   */
  renderGroups(groups) {
    const toRender = [];

    for (let i = 0; i < groups.length; i += 1) {
      const { title, links } = groups[i];

      toRender.push(
        <li className={`${prefix}--footer-nav__list-item`}>
          <FooterNavGroup title={title} links={links} />
        </li>
      );
    }

    return toRender;
  }

  /**
   * Loops through and renders a list of nav groups for the footer nav
   *
   * @param {Array} groups A list of groups to be rendered
   * @returns {object} JSX object
   */
  renderMobileGroups(groups) {
    const toRender = [];

    for (let i = 0; i < groups.length; i += 1) {
      const { title, links } = groups[i];

      toRender.push(
        <FooterNavGroup isMobile={true} title={title} links={links} />
      );
    }

    return toRender;
  }
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
