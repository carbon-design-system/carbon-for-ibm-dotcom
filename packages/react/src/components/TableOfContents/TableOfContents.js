/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  featureFlag,
  settings as ddsSettings,
} from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import root from 'window-or-global';
import { DDS_TOC } from '../../internal/FeatureFlags';
import Layout from '../Layout/Layout';
import TOCDesktop from './TOCDesktop';
import TOCMobile from './TOCMobile';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Table of Contents pattern
 *
 * @param {object} props props object
 * @param {object} props.menuItems menu items object
 * @param {*} props.children children property of component
 * @returns {*} JSX Object
 */
const TableOfContents = ({ menuItems, children, menuLabel }) => {
  const [selectedId, setSelectedId] = useState(menuItems[0].id);
  const [selectedTitle, setSelectedTitle] = useState(menuItems[0].title);

  useEffect(() => {
    scrollStop(setSelectedItem);
  });

  /**
   * Check whether provided anchor tags are in visible viewport
   *
   * @returns {Array} array of name attributes
   */
  const getElemsInView = () => {
    const eles = document.querySelectorAll('a[name]');
    let elesInView = [];
    eles.forEach(element => {
      const bounding = element.getBoundingClientRect();
      if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <=
          (root.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <=
          (root.innerWidth || document.documentElement.clientWidth)
      ) {
        elesInView.push(element.getAttribute('name'));
      }
    });
    return elesInView;
  };

  /**
   * Set selected id & title
   *
   */
  const setSelectedItem = () => {
    const elems = getElemsInView();
    const id = elems[0] || menuItems[0].id;
    const filteredItems = menuItems.filter(menu => {
      if (id !== 'undefined') {
        return menu.id == id;
      }
    });
    const title = filteredItems[0].title;
    setSelectedId(id);
    setSelectedTitle(title);
  };

  /**
   * Detect scroll stop event and run callback function
   *
   * @param {*} callback callback function
   */
  const scrollStop = callback => {
    if (!callback || typeof callback !== 'function') return;
    let isScrolling;
    root.addEventListener(
      'scroll',
      () => {
        root.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          callback();
        }, 66);
      },
      false
    );
  };

  /**
   *
   *
   * @param {*} id selected id of menu item
   * @param {*} title selected title of menu item
   */
  const updateState = (id, title) => {
    setSelectedId(id);
    setSelectedTitle(title);
  };

  const layoutProps = {
    type: '1-3',
    marginTop: 'none',
    marginBottom: 'none',
  };

  const props = {
    menuItems,
    selectedId,
    selectedTitle,
    menuLabel,
    updateState,
  };

  /**
   * Render TableOfContents pattern
   *
   * @returns {*} JSX Object
   */
  return featureFlag(
    DDS_TOC,
    <section
      data-autoid={`${stablePrefix}--tableofcontents`}
      className={`${prefix}--tableofcontents`}>
      <Layout {...layoutProps}>
        <div
          style={{ position: 'sticky', top: '0' }}
          className={`${prefix}--tableofcontents__sidebar`}
          data-sticky="true">
          <div className={`${prefix}--tableofcontents__mobile-top`}></div>
          <TOCDesktop {...props} />
          <TOCMobile {...props} />
        </div>
        <div className={`${prefix}--tableofcontents__content`}>
          <div className={`${prefix}--tableofcontents__content-wrapper`}>
            {children}
          </div>
        </div>
      </Layout>
    </section>
  );
};

TableOfContents.propTypes = {
  menuItems: PropTypes.array,
  children: PropTypes.array,
  menuLabel: PropTypes.string,
};

export default TableOfContents;
