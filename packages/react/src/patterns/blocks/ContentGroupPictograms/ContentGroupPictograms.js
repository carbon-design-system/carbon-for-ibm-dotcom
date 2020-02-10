/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentGroup } from '../../sub-patterns/ContentGroup';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { PictogramItem } from '../../sub-patterns/PictogramItem';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content Array with Pictograms
 *
 * @param {object} props props object
 * @param {Array} props.contentGroup variation of the List section standard, standard with jump link and standard with card link
 * @param {string} props.title List section title
 * @returns {*}  Content array with pictograms JSX Component
 */
const ContentGroupPictograms = ({ heading, items }) => (
  <div
    data-autoid={`${stablePrefix}--content-group-pictograms`}
    className={`${prefix}--content-group-pictograms`}>
    <div className={`${prefix}--content-group-pictograms__row`}>
      <div className={`${prefix}--content-group-pictograms__col`}>
        <ContentGroup heading={heading}>{_renderItems(items)}</ContentGroup>
      </div>
    </div>
  </div>
);

/**
 * Renders the array of items
 *
 * @param {object} items Item object for PictogramItem
 * @returns {*} PictogramItem JSX components
 */
const _renderItems = items =>
  items.map((item, index) => (
    <div
      className={`${prefix}--content-group-pictograms__item`}
      data-autoid={`${prefix}--content-group-pictograms__item`}
      key={index}>
      <PictogramItem {...item} />
    </div>
  ));

ContentGroupPictograms.propTypes = {
  heading: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      copy: PropTypes.string.isRequired,
      cta: PropTypes.shape({
        type: PropTypes.string,
        href: PropTypes.string,
        copy: PropTypes.string,
      }),
      Pictogram: PropTypes.element,
    })
  ),
};

export default ContentGroupPictograms;
