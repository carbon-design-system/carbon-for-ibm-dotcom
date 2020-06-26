/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classnames from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Layout types
 *
 * @type {{'1-3': string[]}}
 * @private
 */
const _types = {
  '1-3': [`${prefix}--col-lg-4`, `${prefix}--col-lg-12`], // 1/4 - 3/4
  '2-1': [`${prefix}--layout-2-3`, `${prefix}--layout-1-3`], // 2/3 - 1/3
};

/**
 * Returns the child classes with the proper column class names
 *
 * @param {string} type layout type
 * @param {number} stickyOffset Sticky offset amount (in pixels)
 * @param {object} children child nodes
 * @returns {*} modified child content
 * @private
 */
function _updateChild(type, stickyOffset, children) {
  const final = [];

  children.map((child, i) => {
    if (child.props['data-sticky'] === 'true') {
      final.push(
        <div
          className={classnames(
            _types[type] && _types[type][i]
              ? `${_types[type][i]} ${prefix}--layout--sticky-mobile`
              : `${prefix}--col`
          )}
          key={i}
          style={{
            top: stickyOffset ? `${stickyOffset}px` : 0,
          }}>
          {React.cloneElement(child, {
            className: classnames(
              child.props.className,
              `${prefix}--layout--sticky-desktop`
            ),
            style: {
              top: stickyOffset ? `${stickyOffset}px` : 0,
            },
          })}
        </div>
      );
    } else {
      final.push(
        React.cloneElement(child, {
          className: classnames(
            child.props.className,
            _types[type] && _types[type][i] ? _types[type][i] : `${prefix}--col`
          ),
          key: i,
        })
      );
    }
  });

  return final;
}

/**
 * Returns the spacing modifier class
 *
 * @param {string} position top or bottom position of the layout
 * @param {string} modifier layout modifier from the layout scale
 * @returns {*|string} spacing class
 * @private
 */
function _spacingClass(position, modifier) {
  return modifier && `${prefix}--layout--${position}-${modifier}`;
}

/**
 * Layout component
 * This is an abstract layout component that can be reutilized for multiple
 * patterns. This autocreates the proper grid classes, along with the optional
 * sticky attribute to the child elements (columns).
 */
const Layout = ({
  type,
  marginTop,
  marginBottom,
  stickyOffset,
  border,
  nested,
  children,
}) => (
  <section
    data-autoid={`${stablePrefix}--layout`}
    className={classnames(nested ? `` : `${prefix}--grid`, {
      [_spacingClass('top', marginTop)]: marginTop,
      [_spacingClass('bottom', marginBottom)]: marginBottom,
    })}>
    <div
      className={classnames(`${prefix}--row`, {
        [`${prefix}--layout--border`]: border,
      })}>
      {_updateChild(type, stickyOffset, children)}
    </div>
  </section>
);

Layout.propTypes = {
  /**
   * Layout type. Choose from:
   *
   * | Name  | Description             |
   * | ----- | ----------------------- |
   * | `1-3` | 1/4 - 3/4 column layout |
   * | `2-1` | 2/3 - 1/3 column layout |
   */
  type: PropTypes.oneOf(['1-3', '2-1']).isRequired,

  /**
   * Top Margin value for Layout. Choose from:
   *
   * | Name                    | Description                            |
   * | ----------------------- | -------------------------------------- |
   * | `layout-01 - layout-07` | Layout token values for the top margin |
   */
  marginTop: PropTypes.oneOf([
    'layout-01',
    'layout-02',
    'layout-03',
    'layout-04',
    'layout-05',
    'layout-06',
    'layout-07',
  ]),

  /**
   * Bottom Margin value for Layout. Choose from:
   *
   * | Name                    | Description                               |
   * | ----------------------- | ----------------------------------------- |
   * | `layout-01 - layout-07` | Layout token values for the bottom margin |
   */
  marginBottom: PropTypes.oneOf([
    'layout-01',
    'layout-02',
    'layout-03',
    'layout-04',
    'layout-05',
    'layout-06',
    'layout-07',
  ]),

  /**
   * Component/Element to render within `<Layout>`.
   */
  children: PropTypes.node,

  /**
   * Defines the offset for the sticky column(s).
   */
  stickyOffset: PropTypes.number,

  /**
   * `true` to use the optional border at the bottom of pattern.
   */
  border: PropTypes.bool,

  /**
   * `true` to make the pattern fits inside a grid.
   */
  nested: PropTypes.bool,
};

Layout.defaultProps = {
  marginTop: null,
  marginBottom: null,
  stickyOffset: null,
  border: false,
  nested: false,
};

export default Layout;
