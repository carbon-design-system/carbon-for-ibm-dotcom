/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentItem from '../ContentItem/ContentItem';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content with pictogram component
 *
 * @param {object} props props object {title, copy, pictogram, link}
 * @param {string} props.heading Content with pictogram component title property
 * @param {string} props.copy Content with pictogram component copy property
 * @param {*} props.Pictogram Content with pictogram component Pictogram component
 * @returns {*} Content array with pictograms item JSX Component
 */
const PictogramItem = ({ heading, copy, Pictogram, cta }) => (
  <div
    data-autoid={`${stablePrefix}--pictogram-item`}
    className={`${prefix}--pictogram-item`}>
    <div className={`${prefix}--pictogram-item__row`}>
      <div className={`${prefix}--pictogram-item__pic-col`}>
        <Pictogram
          data-autoid={`${stablePrefix}--pictogram-item_pictogram`}
          className={`${prefix}--pictogram-item__pictogram`}
        />
      </div>
      <div
        data-autoid={`${stablePrefix}--pictogram-item_content`}
        className={`${prefix}--pictogram-item__content-col`}>
        <ContentItem
          heading={heading}
          copy={copy}
          cta={{ type: 'text', ...cta }}
        />
      </div>
    </div>
  </div>
);

PictogramItem.propTypes = {
  heading: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  cta: PropTypes.object,
  Pictogram: PropTypes.object.isRequired,
};

export default PictogramItem;
