/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CTA } from '../CTA';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LinkList Component, for use with items array
 *
 * @param {object} props props object
 * @param {string} props.heading  Heading string
 * @param {Array} props.items array of item
 * @returns {*} JSX LinkList component
 */
const LinkList = ({ heading, iconPlacement, items, style }) => {
  const linkStyle = style === 'card' ? 'card' : 'text';
  return (
    <div
      className={`${prefix}--link-list`}
      data-autoid={`${stablePrefix}--link-list`}>
      <h4 className={`${prefix}--link-list__heading`}>{heading}</h4>

      <ul
        className={`${prefix}--link-list__list ${prefix}--link-list__list--${style}`}>
        {items.map((cta, index) => {
          return (
            <li
              className={`${prefix}--link-list__list__CTA ${prefix}--link-list__list--${cta.type}`}
              key={index}>
              <CTA
                style={linkStyle}
                {...cta}
                disableImage
                {...(iconPlacement &&
                  linkStyle === 'text' && { iconPlacement })}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

LinkList.propTypes = {
  /**
   * Describes heading of LinkList.
   */
  heading: PropTypes.string,

  /**
   * Describes the list of CTA.
   * The summary of the structure of each items are:
   *
   * | Name      | Description                                                                             |
   * | --------- | --------------------------------------------------------------------------------------- |
   * | `heading` | Describing the resource with added detail.                                              |
   * | `type`    | Describes after onClick where to load. It has `external`, `local`, and `video` options. |
   *
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),
      type: PropTypes.oneOfType([
        PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']),
        PropTypes.arrayOf(
          PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video'])
        ),
      ]),
      copy: PropTypes.string,
      href: PropTypes.string,
      customClassName: PropTypes.string,
    })
  ).isRequired,

  /**
   * Icon placement.
   */
  iconPlacement: PropTypes.oneOf(['left', 'right']),

  /**
   * Orientation of LinkList.
   */
  style: PropTypes.oneOf(['card', 'horizontal', 'vertical', 'vertical-end'])
    .isRequired,
};

export default LinkList;
