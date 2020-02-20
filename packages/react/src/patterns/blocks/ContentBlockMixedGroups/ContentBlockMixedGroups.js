/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentBlock } from '../../sub-patterns/ContentBlock';
import { ContentGroupCards } from '../ContentGroupCards';
import { ContentGroupPictograms } from '../ContentGroupPictograms';
import { ContentGroupSimple } from '../ContentGroupSimple';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentBlockMixedGroups Pattern
 *
 * @param {object} props ContentBlockMixedGroups props object
 * @param {string} props.heading Content block heading
 * @param {string} props.copy Content block description
 * @param {*} props.children Content block mixed groups
 * @param {*} props.cta cta object
 * @returns {*} ContentBlockMixedGroups JSX Object
 */
const ContentBlockMixedGroups = ({ heading, copy, children, cta }) => (
  <ContentBlock
    heading={heading}
    copy={copy}
    cta={cta}
    data-autoid={`${stablePrefix}--content-block-mixedgroups`}
    customClassName={`${prefix}--content-block-mixedgroups ${prefix}--col-lg-8`}>
    {children}
  </ContentBlock>
);

ContentBlockMixedGroups.propTypes = {
  heading: PropTypes.string.isRequired,
  copy: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.instanceOf(ContentGroupCards),
    PropTypes.instanceOf(ContentGroupPictograms),
    PropTypes.instanceOf(ContentGroupSimple),
  ]),
  cta: PropTypes.object,
};

export default ContentBlockMixedGroups;
