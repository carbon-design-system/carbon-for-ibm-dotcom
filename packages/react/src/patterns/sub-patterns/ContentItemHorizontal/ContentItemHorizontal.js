/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Content } from 'carbon-components-react';
import { CTA } from '../../../components/CTA';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { markdownToHtml } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentItemHorizontal Pattern
 *
 * @param {object} props props object
 * @param {Array} props.items items array
 *
 * @returns {*} JSX ContentItemHorizontal pattern
 */
const ContentItemHorizontal = ({ items }) => (
  <div
    className={`${prefix}--content-item-horizontal`}
    data-autoid={`${stablePrefix}--content-item-horizontal`}>
    {items.map((item, index) => {
      return (
        <div className={`${prefix}--content-item-horizontal__container`}>
          <div
            className={`${prefix}---content-item-horizontal__row ${prefix}--content-item-horizontal__item`}
            key={index}>
            <div className={`${prefix}--content-item-horizontal__col`}>
              <p>{item.eyebrow}</p>
              <h3
                className={`${prefix}--content-item-horizontal__item--heading`}>
                {item.heading}
              </h3>
            </div>
            <div className={`${prefix}--content-item-horizontal__col`}>
              <p>{item.copy}</p>
              <CTA
                style="text"
                {...item.cta}
                customClassName={`${prefix}--card__cta`}
              />
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

ContentItemHorizontal.propTypes = {
  items: PropTypes.array,
};

export default ContentItemHorizontal;
