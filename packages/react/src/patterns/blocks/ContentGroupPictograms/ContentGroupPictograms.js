/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import { ContentGroup } from '../../sub-patterns/ContentGroup';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { PictogramItem } from '../../sub-patterns/PictogramItem';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content group — with pictograms
 *
 * @param {object} props props object
 * @param {object} props.className class Name prop
 * @param {Array} props.items Pictogram item content array
 * @param {string} props.heading Content group — with pictograms title
 * @returns {*}  Content group — with pictograms JSX Component
 */
const ContentGroupPictograms = ({ heading, items, className }) => (
  <div
    data-autoid={`${stablePrefix}--content-group-pictograms`}
    className={classNames(className, `${prefix}--content-group-pictograms`)}>
    <ContentGroup heading={heading}>{_renderItems(items)}</ContentGroup>
  </div>
);

/**
 * Renders the array of items
 *
 * @param {Array} items Array of items for PictogramItem
 * @returns {*} PictogramItem JSX components
 */
const _renderItems = items =>
  items.map((item, index) => (
    <PictogramItem
      className={`${prefix}--content-group-pictograms__item`}
      data-autoid={`${prefix}--content-group-pictograms__item`}
      {...item}
      key={index}
    />
  ));

ContentGroupPictograms.propTypes = {
  heading: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(PictogramItem.propTypes)).isRequired,
  className: PropTypes.string,
};

export default ContentGroupPictograms;
