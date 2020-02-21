/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentBlock } from '../../sub-patterns/ContentBlock';
import { ContentItem } from '../../sub-patterns/ContentItem';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { Image } from '../../../components/Image';
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
 * @param {string} props.heading Content block simple heading
 * @param {object} props.image Content item image
 * @param {object} props.cta cta object
 * @returns {*} Content block simple pattern
 */
const ContentBlockSimple = ({ copy, heading, image, cta }) => (
  <ContentBlock
    heading={heading}
    cta={cta}
    customClassName={`${prefix}--content-block-simple`}>
    <div data-autoid={`${stablePrefix}--content-block-simple`}>
      <div
        data-autoid={`${prefix}--content-block-simple__content`}
        className={`${prefix}--content-block-simple__content`}>
        <ContentItem copy={copy} />
        {image && <Image {...image} />}
      </div>
    </div>
  </ContentBlock>
);

ContentBlockSimple.propTypes = {
  copy: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  image: PropTypes.instanceOf(Image),
  cta: PropTypes.object,
};

export default ContentBlockSimple;
