/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentBlock } from '../../sub-patterns/ContentBlock';
import ContentBlockMediaGroup from './ContentBlockMediaGroup';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import FeaturedLink from '../FeaturedLink/FeaturedLink';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Use cases pattern
 *
 * @param {object} props props object
 * @param {string} props.border Use cases border
 * @param {string} props.copy Use cases short copy to support the heading
 * @param {string} props.theme Use cases color theme
 * @param {string} props.heading Use cases heading
 * @param {Array} props.mediaGroup mediaGroup array with heading, image and lists
 * @param {object} props.featuredLink featuredLink object
 * @returns {object} JSX Object
 */
const ContentBlockMedia = ({
  border,
  copy,
  theme,
  heading,
  mediaGroup,
  featuredLink,
}) => {
  const setBorder = _setBorder(border);
  const setTheme = _setTheme(theme);

  return (
    <ContentBlock
      heading={heading}
      copy={copy}
      data-autoid={`${stablePrefix}--content-block-media`}
      customClassName={`${prefix}--content-block-media ${prefix}--col-lg-8 ${setBorder} ${setTheme}`}>
      {_rendermediaGroup(mediaGroup)}
      {featuredLink && <FeaturedLink {...featuredLink} />}
    </ContentBlock>
  );
};

/**
 * Render Content Block Media Group Component
 *
 * @private
 * @param {Array} items content block media group items array
 * @returns {object} JSX Object
 */
const _rendermediaGroup = items => {
  return items.map(item => {
    return <ContentBlockMediaGroup key={item.title} mediaGroup={item} />;
  });
};

/**
 * sets the class name based on border type
 *
 * @private
 * @param {boolean} border includes border or not ( true | false )
 * @returns {string} border type css class names
 */
const _setBorder = border => {
  let withBorder;
  withBorder =
    border === true ? `${prefix}--content-block-media--with-border` : '';
  return withBorder;
};

/**
 * sets the class name based on theme type
 *
 * @private
 * @param {string} theme theme type ( g100 | white/default )
 * @returns {string} theme css class names
 */
const _setTheme = theme => {
  return theme && `${prefix}--content-block-media--${theme}`;
};

ContentBlockMedia.propTypes = {
  border: PropTypes.bool,
  copy: PropTypes.string,
  theme: PropTypes.string,
  heading: PropTypes.string.isRequired,
  mediaGroup: PropTypes.array,
  featuredLink: PropTypes.object,
};

export default ContentBlockMedia;
