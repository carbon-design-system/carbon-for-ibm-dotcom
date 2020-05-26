/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';

import Layout from '../Layout/Layout';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import settings from 'carbon-components/es/globals/js/settings';

import TOCDesktop from './TOCDesktop';
import TOCMobile from './TOCMobile';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * loops into the array of elements and returns the values
 *
 * @private
 * @returns {Array} returns elemenrt name and data title
 */
const _findMenuItems = () => {
  const eles = document.querySelectorAll('a[name]');
  const menuItems = [];
  eles.forEach(element => {
    if (element.getAttribute('name') !== 'menuLabel') {
      menuItems.push({
        id: element.getAttribute('name'),
        title: element.getAttribute('data-title'),
      });
    }
  });
  return menuItems;
};

/**
 * Table of Contents pattern.
 */
const TableOfContents = ({
  menuItems,
  children,
  menuLabel,
  theme,
  stickyOffset,
  menuRule,
  headingContent,
}) => {
  const [useMenuItems, setUseMenuItems] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  useEffect(() => {
    if (menuItems?.length) {
      setUseMenuItems([...menuItems]);
    } else {
      setUseMenuItems(_findMenuItems());
    }
  }, [menuItems]);

  useEffect(() => {
    let id = useMenuItems[0] ? useMenuItems[0].id : '';
    let title = useMenuItems[0] ? useMenuItems[0].title : '';
    if (id === 'menuLabel' && useMenuItems[1]) {
      id = useMenuItems[1].id;
      title = useMenuItems[1].title;
    }

    setSelectedId(id);
    setSelectedTitle(title);
  }, [useMenuItems]);

  useEffect(() => {
    /**
     * Function to be added to eventListener and cleaned later on
     */
    const handleRAF = () => {
      window.requestAnimationFrame(setSelectedItem);
    };

    window.addEventListener('scroll', handleRAF);
    return () => window.removeEventListener('scroll', handleRAF);
  });

  /**
   * Set selected id & title
   *
   */
  const setSelectedItem = () => {
    const elems = getElemsInView();
    if (elems) {
      const id = elems || useMenuItems[0].id;
      const filteredItems = useMenuItems.filter(menu => {
        if (id !== 'undefined') {
          return menu.id === id;
        }
      });
      const title = filteredItems[0]?.title;
      if (title !== undefined) {
        setSelectedId(id);
        setSelectedTitle(title);
      }
    }
  };

  /**
   * Check whether provided anchor tags are in visible viewport
   *
   * @returns {string} name attribute
   */
  const getElemsInView = () => {
    const items = [...document.querySelectorAll('a[name]')].filter(
      elem => elem.getBoundingClientRect().y <= root.innerHeight / 2
    );
    return items[items.length - 1].getAttribute('name');
  };

  /**
   * Sets the selected menu item
   *
   * @param {*} id selected id of menu item
   * @param {*} title selected title of menu item
   */
  const updateState = (id, title) => {
    setSelectedId(id);
    setSelectedTitle(title);
  };

  /**
   * sets the class name based on theme type
   *
   * @private
   * @param {string} theme theme type ( g100 | white/default )
   * @returns {string} theme css class names
   */
  const _setTheme = theme => {
    return theme && `${prefix}--tableofcontents--${theme}`;
  };

  /**
   * Props for the Layout component
   *
   * @type {{marginBottom: string, type: string, marginTop: string}}
   */
  const layoutProps = {
    type: '1-3',
    marginTop: 'none',
    marginBottom: 'none',
    stickyOffset,
  };

  /**
   * Validate if the Menu Items has Id and Title filled
   *
   * @param {Array} menuItems array of Items
   * @returns {Array} filtered array of items
   */
  const validateMenuItems = menuItems => {
    return menuItems.filter(
      item => item.title.trim().length > 0 && item.id.trim().length > 0
    );
  };

  /**
   * Props for TOCDesktop and TOCMobile
   *
   * @type {{
   * updateState: Function,
   * selectedId: string,
   * menuItems: Array,
   * selectedTitle: string,
   * menuLabel: string
   * children: object
   * }}
   */
  const props = {
    menuItems: validateMenuItems(useMenuItems),
    selectedId,
    selectedTitle,
    menuLabel,
    updateState,
    children: children.length > 1 ? children[0] : null,
  };

  /**
   * Render TableOfContents pattern
   *
   * @returns {*} JSX Object
   */
  return (
    <section
      data-autoid={`${stablePrefix}--tableofcontents`}
      className={classNames(`${prefix}--tableofcontents`, _setTheme(theme))}>
      <Layout {...layoutProps}>
        <div
          style={{ position: 'sticky', top: '0' }}
          className={`${prefix}--tableofcontents__sidebar`}
          data-sticky="true">
          <div className={`${prefix}--tableofcontents__mobile-top`}></div>
          <TOCDesktop
            menuRule={menuRule}
            headingContent={headingContent}
            {...props}
          />
          <TOCMobile {...props} />
        </div>
        <div className={`${prefix}--tableofcontents__content`}>
          <div className={`${prefix}--tableofcontents__content-wrapper`}>
            {headingContent !== undefined ? (
              <>
                <div className={`${prefix}--tableofcontents__children__mobile`}>
                  {headingContent}
                </div>
                {children}
              </>
            ) : (
              children
            )}
          </div>
        </div>
      </Layout>
    </section>
  );
};

TableOfContents.propTypes = {
  /**
   * Array of menu item objects to render within the side nav.
   * Each items has the following structure:
   *
   * | Properties Name | Data Type | Description     |
   * | --------------- | --------- | --------------- |
   * | title           | String    | Menu title text |
   * | id              | String    | Menu id         |
   *
   * If `menuItems` is not passed in as a prop, the menu items are dynamically
   * generated based on anchor links that exist on the page. The anchor links should
   * follow the following format:
   *
   * ```html
   * <a name="name-of-section" data-title="Lorem Ipsum"></a>
   * ```
   */
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),

  /**
   * Content to display next to the side nav.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),

  /**
   * Placeholder value for menu label.
   */
  menuLabel: PropTypes.string,

  /**
   * Defines the color theme for the pattern. Choose from:
   *
   * | Name            | Description                              |
   * | --------------- | ---------------------------------------- |
   * | white / default | White theme applied to pattern           |
   * | g10             | Gray 10 (g10) theme applied to pattern   |
   * | g100            | Gray 100 (g100) theme applied to pattern |
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g100']),

  /**
   * Defines the offset for the sticky column.
   */
  stickyOffset: PropTypes.number,

  /**
   * Defines if the menu ruler will be rendered.
   */
  menuRule: PropTypes.bool,

  /**
   * Content to be displayed above the navigation menu.
   */
  headingContent: PropTypes.node,
};

TableOfContents.defaultProps = {
  menuItems: null,
  menuLabel: 'Jump to',
  theme: 'white',
  stickyOffset: null,
};

export default TableOfContents;
