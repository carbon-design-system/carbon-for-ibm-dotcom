/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import { DDS_CONTENTARRAYWITHPICTOGRAMS } from '../../internal/FeatureFlags';
import ContentArrayWithPictogramsItem from './ContentArrayWithPictogramsItem';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content Array with Pictograms
 *
 * @param {object} props props object
 * @param {string} props.title List section title
 * @param {Array} props.contentGroup variation of the List section standard, standard with jump link and standard with card link
 * @returns {*}  Contennt array with pictograms JSX Component
 */
const ContentArrayWithPictograms = ({ title, contentGroup }) =>
  featureFlag(
    DDS_CONTENTARRAYWITHPICTOGRAMS,
    <section
      data-autoid={`${stablePrefix}--contentarraywithpictograms`}
      className={`${prefix}--contentarraywithpictograms`}>
      <div className={`${prefix}--contentarraywithpictograms__container`}>
        <div className={`${prefix}--contentarraywithpictograms__row`}>
          <div className={`${prefix}--contentarraywithpictograms__col`}>
            <h2 className={`${prefix}--contentarraywithpictograms__title`}>
              {title}
            </h2>
            {_renderArray(contentGroup)}
          </div>
          <div
            className={`${prefix}--contentarraywithpictograms__divider__col`}>
            <div
              className={`${prefix}--contentarraywithpictograms__divider`}></div>
          </div>
        </div>
      </div>
    </section>
  );

/**
 * Render the content in array list
 *
 * @private
 * @param {Array} contentArray contentGroup object array
 * @returns {object} JSX Object
 */
const _renderArray = contentArray =>
  contentArray.map(contentItem => (
    <ContentArrayWithPictogramsItem
      title={contentItem.title}
      pictogram={contentItem.pictogram}
      copy={contentItem.copy}
      link={contentItem.link}
    />
  ));

ContentArrayWithPictograms.propTypes = {
  title: PropTypes.string.isRequired,
  contentGroup: PropTypes.shape({
    title: PropTypes.string,
    copy: PropTypes.string,
    pictogram: PropTypes.string,
    link: PropTypes.shape({
      href: PropTypes.string,
      text: PropTypes.string,
      target: PropTypes.string,
    }),
  }),
};

export default ContentArrayWithPictograms;
