/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import classNames from 'classnames';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import { TABLE_OF_CONTENTS } from '../../internal/FeatureFlags';
import { TableOfContents20 } from '@carbon/icons-react';
import { Layout } from '@carbon/ibmdotcom-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Table of Contents pattern
 *
 * @param {object} props props object
 * @param {string} props.layoutType layout type property ( 1/3 - 1/4 )
 * @param {object} props.menuItems menu items object which includes title and id
 * @param {element} props.children children property of table of contents pattern
 * @param {object} props.marginTop margin top property which adds margin top value to layout
 * @param {object} props.marginBottom margin bottom property which adds margin top value to layout
 * @returns {*} Table of Content pattern
 */
class TableOfContents extends React.Component {
  menuRef = React.createRef();
  state = {
    selectedItem: 1,
    selectedTitle: '',
  };

  /**
   *
   *
   * @memberof TableOfContents
   */
  componentDidMount() {
    window.addEventListener('scroll', this.isInViewport);
  }

  /**
   *
   *
   * @memberof TableOfContents
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.isInViewport);
  }

  /**
   * Check whether content is in view
   *
   * @memberof TableOfContents
   */
  isInViewport = () => {
    const items = document.querySelectorAll('[data-driverlocation]');
    let itemsInView = [];
    items.forEach(item => {
      const bounding = item.getBoundingClientRect();
      if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      ) {
        itemsInView.push(item.dataset.driverlocation);
        this.setState({ selectedTitle: item.querySelector('h3').innerText });
      }
    });
    this.setState({ selectedItem: itemsInView[0] });
  };

  /**
   * Set class name for active menu item
   *
   * @param {string} contentId data-driverlocation value of content
   * @param {string} menuId id value of selected menu item
   * @memberof TableOfContents
   * @returns {string} css class name for active menu item
   */
  setActiveClass = (contentId, menuId) => {
    let active;
    active =
      contentId === menuId
        ? `${prefix}--tableofcontents__desktop-menu__item--active`
        : '';
    return active;
  };

  /**
   * handle click event on menu items to scroll to element
   *
   * @param {object} e event object
   * @param {string} id data-driverlocation value of content
   * @memberof TableOfContents
   */
  onMenuItemsClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    document
      .querySelector(`[data-driverlocation="${id}"]`)
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /**
   * handle onChange event on select to scroll to element
   *
   * @param {object} e event object
   * @memberof TableOfContents
   */
  onSelectChange = e => {
    this.setState({ selectedItem: e.target.value });
    const child = document.querySelector(
      `[data-driverlocation="${e.target.value}"]`
    );
    child.scrollIntoView(true);
    const scrolledY = window.scrollY;
    if (scrolledY) {
      window.scroll({
        left: 0,
        top: scrolledY - 48,
        behavior: 'smooth',
      });
    }
  };

  /**
   * Set focus state to menuRef to activate
   *
   * @memberof TableOfContents
   */
  onMenuButtonClick = () => {
    this.menuRef.current.focus();
  };

  /**
   * Render options for select
   *
   * @param {Array} items menu item arrray
   * @memberof TableOfContents
   * @returns {*} JSX Object
   */
  renderSelectOptions = items => {
    return items.map(item => {
      if (item) {
        return (
          <option
            className={`${prefix}--tableofcontents__mobile-menu__select__option`}
            key={item.id}
            value={item.id}>
            {item.title}
          </option>
        );
      }
    });
  };

  /**
   * Render items for menu
   *
   * @param {Array} items menu item arrray
   * @returns {*} JSX Object
   */
  renderMenuItems = items => {
    return items.map(item => {
      if (item) {
        return (
          <li
            key={item.id}
            className={classNames(
              `${prefix}--tableofcontents__desktop-menu__item`,
              this.setActiveClass(this.state.selectedItem, item.id)
            )}>
            <a
              onClick={e => {
                this.onMenuItemsClick(e, item.id);
              }}
              href={item.id}>
              {item.title}
            </a>
          </li>
        );
      }
    });
  };

  /**
   * Render TableOdContents pattern
   *
   * @returns {*} JSX Object
   * @memberof TableOfContents
   */
  render() {
    const {
      layoutType,
      menuItems,
      children,
      marginTop,
      marginBottom,
    } = this.props;

    return featureFlag(
      TABLE_OF_CONTENTS,
      <section
        data-autoid={`${stablePrefix}--tableofcontents`}
        className={`${prefix}--tableofcontents`}>
        <div className={`${prefix}--tableofcontents__mobile-menu`}>
          <div className={`${prefix}--tableofcontents__mobile-menu__wrapper`}>
            <span className={`${prefix}--tableofcontents__mobile-menu__label`}>
              Jump to{' '}
              {this.state.selectedTitle ? this.state.selectedTitle : '...'}
            </span>
            <select
              onChange={this.handleSelect}
              className={`${prefix}--tableofcontents__mobile-menu__select`}
              ref={this.menuRef}
              onFocus={e => {
                e.target.size = '6';
              }}
              onBlur={e => {
                e.target.size = '0';
              }}>
              {this.renderSelectOptions(menuItems)}
            </select>
            <button
              className={`${prefix}--tableofcontents__mobile-menu__button`}
              onClick={this.onMenuButtonClick}>
              <TableOfContents20 />
            </button>
          </div>
          <div
            className={`${prefix}--tableofcontents__mobile-menu__divider`}></div>
        </div>
        <Layout
          type={layoutType}
          marginTop={marginTop}
          marginBottom={marginBottom}>
          <div
            className={`${prefix}--tableofcontents__sidebar`}
            data-sticky="true">
            <ul className={`${prefix}--tableofcontents__desktop-menu`}>
              {this.renderMenuItems(menuItems)}
            </ul>
          </div>
          <div className={`${prefix}--tableofcontents__content`}>
            {children}
          </div>
        </Layout>
      </section>
    );
  }
}

TableOfContents.propTypes = {
  layoutType: PropTypes.string,
  menuItems: PropTypes.array,
  children: PropTypes.array,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
};

export default TableOfContents;
