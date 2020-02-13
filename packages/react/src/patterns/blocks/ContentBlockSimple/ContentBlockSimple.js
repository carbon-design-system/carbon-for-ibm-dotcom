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
 * @param {string} props.copy Content block simple  short copy to support the title
 * @param {string} props.linkType link type ( simple | jump | card )
 * @param {object} props.link link object which includes url, link text and target properties.
 * @param {string} props.title Content block simple title
 * @param {object} props.cta cta object
 * @returns {*} Content block simple pattern
 */
const ContentBlockSimple = ({
  copy,
  title,
  cta,
  children,
}) => {
  console.log('cta style', cta.style);
  return (
    <ContentBlock
      heading={title}
      copy={copy}
      cta={cta}
      data-autoid={`${stablePrefix}--content-block-simple`}
      customClassName={`${prefix}--content-block-simple ${prefix}--col-lg-8`}>
      {_renderContentGroupSimple(children)}
    </ContentBlock>
  );
};

/**
 * Iterate through children and render
 *
 * @param {Array} children A list of Content Group - Simple to be rendered
 * @returns {object} a JSX object
 */
const _renderContentGroupSimple = children =>
  children.map((child, index) =>
    <ContentGroupSimple
      mediaType={child.mediaType.mediaType}
      mediaData={child.mediaData.mediaData}
      heading={child.heading.heading}
      items={child.items.items}
      cta={child.cta}
      key={index}
    />
  );

ContentBlockSimple.propTypes = {
  copy: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cta: PropTypes.object,
  children: PropTypes.array,
};

export default ContentBlockSimple;
