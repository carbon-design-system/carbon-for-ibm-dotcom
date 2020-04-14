/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentBlock } from '../../sub-patterns/ContentBlock';
import { ContentItem } from '../../sub-patterns/ContentItem';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { ImageWithCaption } from '../../../components/ImageWithCaption';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content Block - Simple pattern
 *
 * @param {object} props props object
 * @param {string} props.copy multiple paragraphs to support the heading
 * @param {string} props.heading Content block simple heading
 * @param {object} props.image Content item image
 * @param {object} props.cta cta object
 * @param {object} props.aside elements to render on right panel
 * @returns {*} Content block simple pattern
 */
const ContentBlockSimple = ({ copy, heading, image, cta, aside }) => (
  <div
    data-autoid={`${stablePrefix}--content-block-simple`}
    className={`${prefix}--content-block-simple`}>
    <ContentBlock heading={heading} cta={cta} aside={aside}>
      <div className={`${prefix}--content-block-simple__content`}>
        <ContentItem copy={copy} />
        {image && <ImageWithCaption {...image} />}
      </div>
    </ContentBlock>
  </div>
);

ContentBlockSimple.propTypes = {
  copy: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  image: PropTypes.instanceOf(ImageWithCaption),
  cta: PropTypes.object,
  aside: PropTypes.object,
};

export default ContentBlockSimple;
