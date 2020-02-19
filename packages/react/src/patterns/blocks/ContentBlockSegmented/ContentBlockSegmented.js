/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentBlock } from '../../sub-patterns/ContentBlock';
import { ContentGroupSimple } from '../ContentGroupSimple';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content Block - Simple pattern
 *
 * @param {object} props props object
 * @param {string} props.copy Content block simple short copy to support the heading
 * @param {string} props.linkType link type ( simple | jump | card )
 * @param {object} props.link link object which includes url, link text and target properties.
 * @param {string} props.heading Content block simple heading
 * @param {object} props.cta cta object
 * @param {object} props.contentGroup chilren content element
 * @returns {*} Content block simple pattern
 */
const ContentBlockSimple = ({
  copy,
  heading,
  cta,
  ctaStyle,
  ctaType,
  contentGroup,
}) => {
  return (
    <ContentBlock
      heading={heading}
      copy={copy}
      cta={cta}
      ctaStyle={ctaStyle}
      ctaType={ctaType}
      data-autoid={`${stablePrefix}--content-block-simple`}
      customClassName={`${prefix}--content-block-simple ${prefix}--col-lg-8`}>
      <ContentGroupSimple
        mediaType={contentGroup.mediaType.mediaType}
        mediaData={contentGroup.mediaData.mediaData}
        heading={contentGroup.heading.heading}
        items={contentGroup.items.items}
        cta={contentGroup.cta}
      />
    </ContentBlock>
  );
};

ContentBlockSimple.propTypes = {
  copy: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  cta: PropTypes.object,
  ctaStyle: PropTypes.string,
  ctaType: PropTypes.string,
  contentGroup: PropTypes.object,
};

export default ContentBlockSimple;
