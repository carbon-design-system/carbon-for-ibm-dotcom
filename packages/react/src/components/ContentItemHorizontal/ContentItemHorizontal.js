/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { LinkList } from '../LinkList';
import markdownToHtml from '@carbon/ibmdotcom-utilities/es/utilities/markdownToHtml/markdownToHtml';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentItemHorizontal Pattern
 *
 * @param {object} props props object
 * @param {string} props.eyebrow eyebrow text
 * @param {string} props.heading heading text
 * @param {string} props.copy copy text
 * @param {Array} props.cta cta array
 *
 * @returns {*} JSX ContentItemHorizontal pattern
 */
const ContentItemHorizontal = ({ eyebrow, heading, copy, cta }) => (
  <div
    className={`${prefix}--content-item-horizontal__item ${prefix}`}
    data-autoid={`${stablePrefix}--content-item-horizontal__item`}>
    <div className={`${prefix}--content-item-horizontal__row`}>
      <div className={`${prefix}--content-item-horizontal__col`}>
        {eyebrow && (
          <p
            className={`${prefix}--content-item-horizontal__item--eyebrow`}
            data-autoid={`${stablePrefix}--content-item-horizontal__item--eyebrow`}>
            {eyebrow}
          </p>
        )}
        <h3
          className={`${prefix}--content-item-horizontal__item--heading`}
          data-autoid={`${stablePrefix}--content-item-horizontal__item--heading`}>
          {heading}
        </h3>
      </div>
      <div className={`${prefix}--content-item-horizontal__col`}>
        <div
          className={`${prefix}--content-item-horizontal__item--copy`}
          data-autoid={`${stablePrefix}--content-item-horizontal__item--copy`}
          dangerouslySetInnerHTML={{
            __html: markdownToHtml(copy, { bold: false }),
          }}
        />
        {cta && (
          <div
            className={`${prefix}--content-item-horizontal__item--cta`}
            data-autoid={`${stablePrefix}--content-item-horizontal__item--cta`}>
            <LinkList style="vertical" {...cta} />
          </div>
        )}
      </div>
    </div>
  </div>
);

ContentItemHorizontal.propTypes = {
  /**
   * Optional text displayed above the heading.
   */
  eyebrow: PropTypes.string,

  /**
   * Heading of the content item.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Copy of the content item. Accepts _italic_ markdown formatting.
   */
  copy: PropTypes.string.isRequired,

  /**
   * Optional CTA links displayed below the copy.
   * Each item has the following structure:
   *
   * | Name   | Required | Data Type | Description                                |
   * | ------ | -------- | --------- | ------------------------------------------ |
   * | `type` | YES      | Object    | Link type. Accepts `local` and `external`. |
   * | `copy` | YES      | String    | Link text.                                 |
   * | `href` | YES      | String    | URI for internal or external resource.     |
   */
  cta: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['local', 'external']).isRequired,
      href: PropTypes.string.isRequired,
      copy: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContentItemHorizontal;
