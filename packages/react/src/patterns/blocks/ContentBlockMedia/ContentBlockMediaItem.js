/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArrowRight20 } from '@carbon/icons-react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { LinkWithIcon } from '../../../components/LinkWithIcon';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentBlockMediaItem
 *
 * @param {object} props props object { lists:{ title, copy, link: { text, href, target}} }
 * @param {string} props.lists.title ContentBlockMediaItem title property
 * @param {string} props.lists.copy ContentBlockMediaItem copy property
 * @param {object} props.lists.link ContentBlockMediaItem link object
 * @param {string} props.lists.link.href ContentBlockMediaItem href property of link object
 * @param {string} props.lists.link.title ContentBlockMediaItem text property of link object
 * @param {string} props.lists.link.target ContentBlockMediaItem target property of link object
 * @returns {object} JSX Object
 */
const ContentBlockMediaItem = ({ lists: { title, copy, link } }) => {
  return (
    <div
      data-autoid={`${stablePrefix}--content-block-media-item`}
      className={`${prefix}--content-block-media-item`}>
      <h3 className={`${prefix}--content-block-media-item__title`}>{title}</h3>
      <div className={`${prefix}--content-block-media-item__content`}>
        {copy}
      </div>
      <div
        data-autoid={`${stablePrefix}--content-block-media-item__link`}
        className={`${prefix}--content-block-media-item__link`}>
        {link && (
          <LinkWithIcon href={link.href} target={link.target}>
            <span>{link.title}</span>
            <ArrowRight20 />
          </LinkWithIcon>
        )}
      </div>
    </div>
  );
};

ContentBlockMediaItem.propTypes = {
  lists: PropTypes.shape({
    title: PropTypes.string,
    copy: PropTypes.string,
    link: PropTypes.PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string,
      target: PropTypes.string,
    }),
  }),
};

export default ContentBlockMediaItem;
