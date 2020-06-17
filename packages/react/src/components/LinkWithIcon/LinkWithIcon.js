/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */


import ArrowDown20 from '@carbon/icons-react/es/arrow--down/20';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import cx from "classnames";
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import Download20 from '@carbon/icons-react/es/download/20';
import Launch20 from '@carbon/icons-react/es/launch/20';
import Link from '../../internal/vendor/carbon-components-react/components/Link/Link';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import PlayOutline20 from "@carbon/icons-react/lib/play--outline/20";

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LinkWithIcon component.
 */
const LinkWithIcon = ({children, href, copy, type, direction, visited, ...props }) => {
  const RenderIcon = _renderLinkIcon(type);

  console.log('visited state', visited);
  return (
    <div
      className={cx(`${prefix}--link-with-icon__container`, {
        [`${prefix}--link-with-icon__container--disabled`]: props.disabled,
      }) }
      data-autoid={`${stablePrefix}--link-with-icon`}>
      <Link href={href} className={cx(`${prefix}--link-with-icon`, {
        [`${prefix}--link-with-icon--visited`]: visited,
      })} {...props}>
        {direction === 'left' ? <RenderIcon className={`${prefix}--link-with-icon_left-icon`}/> : ''}
        {copy}
        {children}
        {direction === 'right' ? <RenderIcon className={`${prefix}--link-with-icon_right-icon`}/> : ''}
      </Link>
    </div>
  );
};


const _renderLinkIcon = (type) => {
  switch (type) {
    case 'download':
      return Download20;
    case 'external':
      return Launch20;
    case 'jump':
      return ArrowDown20;
    case 'video':
      return PlayOutline20;
    default:
      return ArrowRight20;
  }
};

LinkWithIcon.propTypes = {
  /**
   * Array containing Link text and icon elements.
   */
  children: PropTypes.arrayOf(PropTypes.node),
  /**
   * Url of link.
   */
  href: PropTypes.string,
  /**
   * link visited state.
   */
  visited: PropTypes.bool,
  /**
   * disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * link copy.
   */
  copy: PropTypes.string,
  /**
   * icon objects to render.
   * | Type       | SVG element Name | Description                                                      |
   * | ---------- | ---------------- | ---------------------------------------------------------------- |
   * | `jump`     | ArrowDown20      | Describes down arrow onClick which scrollToView of target.       |
   * | `external` | Launch20         | Describes launch arrow onClick which loads in new tab.           |
   * | `download` | Download20       | Describes download arrow onClick for downloading files.          |
   *
   */
   type: PropTypes.oneOfType([
   PropTypes.oneOf([
   'external',
   'download',
   'jump',
   ]),
   PropTypes.arrayOf(
   PropTypes.oneOf([
   'external',
   'download',
   'jump',
   ])
   ),
   ]),

   /***  icon direction
   *
   * | Name         | Data Type | Description           |
   * | ------------ | --------- | --------------------- |
   * | `left`       | String    | icon on the left      |
   * | `right`      | string    | icon on the right     |
   */
    direction: PropTypes.oneOfType([
      PropTypes.oneOf([
        'right',
        'left',
      ]),
      PropTypes.arrayOf(
        PropTypes.oneOf([
          'right',
          'left',
        ])
      ),
    ]),
};

LinkWithIcon.defaultProps = {
  children: [],
  href: '',
  copy: '',
  type: '',
  direction: 'right',
  disabled: false,
};

export default LinkWithIcon;
