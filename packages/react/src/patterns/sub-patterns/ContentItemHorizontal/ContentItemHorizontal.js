/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
            {cta.map((cta, index) => (
              <CTA
                style="text"
                {...cta}
                customClassName={`${prefix}--card__cta`}
                key={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

ContentItemHorizontal.propTypes = {
  eyebrow: PropTypes.string,
  heading: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  cta: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['local', 'external']),
      href: PropTypes.string,
      copy: PropTypes.string,
    })
  ),
};

export default ContentItemHorizontal;
