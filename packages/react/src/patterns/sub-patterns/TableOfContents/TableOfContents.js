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
 * Table of Contents pattern
 *
 * @param {object} props props object
 * @param {object} props.menuItems menu items object
 * @param {string} props.menuLabel mobile menu label
 * @param {string} props.theme theme [g100/white]
 * @param {number} props.stickyOffset offset amount for Layout (in pixels)
 * @param {boolean} props.menuRule optional rule for menu
 * @param {*} props.headingContent heading content component
 * @param {*} props.children children property of component
 * @returns {*} JSX Object
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
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  menuLabel: PropTypes.string,
  theme: PropTypes.string,
  stickyOffset: PropTypes.number,
  menuRule: PropTypes.bool,
  headingContent: PropTypes.node,
};

/**
 * @property {object} defaultProps default TableOfContents props
 * @type {{marginBottom: null, stickyOffset: number, marginTop: null}}
 */
TableOfContents.defaultProps = {
  menuItems: null,
  menuLabel: 'Jump to',
  theme: 'white',
  stickyOffset: null,
};

export default TableOfContents;
