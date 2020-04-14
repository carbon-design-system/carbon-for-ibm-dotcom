/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CTA } from '../../../components/CTA';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { ImageWithCaption } from '../../../components/ImageWithCaption';
import { markdownToHtml } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentItem Component
 *
 * @param {object} props props object
 * @param {string} props.cta cta object
 * @param {string} props.copy copy text
 * @param {string} props.heading  heading object
 * @param {object} props.image image object
 * @returns {*} JSX ContentItem component
 */
const ContentItem = ({ cta, copy, heading, image }) => (
  <div
    className={`${prefix}--content-item`}
    data-autoid={`${stablePrefix}--content-item`}>
    {heading && (
      <h4
        data-autoid={`${stablePrefix}--content-item__heading`}
        className={`${prefix}--content-item__heading`}>
        {heading}
      </h4>
    )}
    {image && (
      <ImageWithCaption
        customClassName={`${prefix}--content-item__image`}
        {...image}
      />
    )}
    {copy && (
      <div
        data-autoid={`${stablePrefix}--content-item__copy`}
        className={`${prefix}--content-item__copy`}
        dangerouslySetInnerHTML={{
          __html: markdownToHtml(copy, { bold: false }),
        }}></div>
    )}
    {cta && (
      <CTA
        style="text"
        type={cta.type}
        copy={cta.copy}
        href={cta.href}
        customClassName={`${prefix}--content-item__cta`}
      />
    )}
  </div>
);

ContentItem.propTypes = {
  cta: PropTypes.oneOfType(PropTypes.shape(CTA.propTypes)),
  copy: PropTypes.string,
  heading: PropTypes.string,
  image: PropTypes.oneOfType(PropTypes.shape(ImageWithCaption.propTypes)),
};

export default ContentItem;
