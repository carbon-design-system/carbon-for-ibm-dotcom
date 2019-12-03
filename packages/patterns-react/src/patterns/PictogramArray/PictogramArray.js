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
import { DDS_PICTOGRAM_ARRAY } from '../../internal/FeatureFlags';
import PictogramArrayItem from './PictogramArrayItem';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content Array with Pictograms
 *
 * @param {object} props props object
 * @param {string} props.title List section title
 * @param {Array} props.contentGroup variation of the List section standard, standard with jump link and standard with card link
 * @returns {*}  Content array with pictograms JSX Component
 */
const PictogramArray = ({ title, contentGroup }) =>
  featureFlag(
    DDS_PICTOGRAM_ARRAY,
    <section
      data-autoid={`${stablePrefix}--pictogramarray`}
      className={`${prefix}--pictogramarray`}>
      <div className={`${prefix}--pictogramarray__container`}>
        <div className={`${prefix}--pictogramarray__row`}>
          <div className={`${prefix}--pictogramarray__col`}>
            <h2 className={`${prefix}--pictogramarray__title`}>{title}</h2>
            {_renderArray(contentGroup)}
          </div>
          <div className={`${prefix}--pictogramarray__divider__col`}>
            <div className={`${prefix}--pictogramarray__divider`}></div>
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
    <PictogramArrayItem
      title={contentItem.title}
      pictogram={contentItem.pictogram}
      copy={contentItem.copy}
      link={contentItem.link}
    />
  ));

PictogramArray.propTypes = {
  title: PropTypes.string.isRequired,
  contentGroup: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      copy: PropTypes.string,
      link: PropTypes.shape({
        href: PropTypes.string,
        text: PropTypes.string,
        target: PropTypes.string,
      }),
      pictogram: PropTypes.string,
    })
  ),
};

export default PictogramArray;
