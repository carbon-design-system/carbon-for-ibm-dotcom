/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { featureFlag, markdownToHtml } from '@carbon/ibmdotcom-utilities';
import { DDS_CONTENT_ITEM } from '../../../internal/FeatureFlags';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { Image } from '../../../components/Image';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentItem Component
 *
 * @param {object} props props object
 * @param {string} props.copy copy text
 * @param {string} props.heading  Heading objects
 * @param {object} props.image image object
 * @returns {*} JSX ContentItem component
 */
const ContentItem = ({ copy, heading, image }) => {
  return featureFlag(
    DDS_CONTENT_ITEM,
    <div
      className={`${prefix}--content-item`}
      data-autoid={`${stablePrefix}--content-item`}>
      {heading && (
        <h4 className={`${prefix}--content-item__heading`}>{heading}</h4>
      )}
      {image && (
        <Image classname={`${prefix}--content-item__image`} {...image} />
      )}
      {copy && (
        <span
          className={`${prefix}--content-item__copy`}
          dangerouslySetInnerHTML={{
            __html: markdownToHtml(copy),
          }}></span>
      )}
    </div>
  );
};

ContentItem.propTypes = {
  copy: PropTypes.string,
  heading: PropTypes.string,
  image: PropTypes.object,
};

export default ContentItem;
