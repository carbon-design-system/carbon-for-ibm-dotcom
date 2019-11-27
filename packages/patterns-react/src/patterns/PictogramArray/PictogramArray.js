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
import { DDS_PICTOGRAMARRAY } from '../../internal/FeatureFlags';
import PictogramArrayItem from './PictogramArrayItem';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content Array with Pictograms
 *
 * @param {object} props props object
 * @param {string} props.title List section title
 * @param {Array} props.contentGroup variation of the List section standard, standard with jump link and standard with card link
 * @param {*} props.children List of JSX child pictogram elements
 * @returns {*}  Content array with pictograms JSX Component
 */
const PictogramArray = ({ title, contentGroup, children }) =>
  featureFlag(
    DDS_PICTOGRAMARRAY,
    <section
      data-autoid={`${stablePrefix}--pictogramarray`}
      className={`${prefix}--pictogramarray`}>
      <div className={`${prefix}--pictogramarray__container`}>
        <div className={`${prefix}--pictogramarray__row`}>
          <div className={`${prefix}--pictogramarray__col`}>
            <h2 className={`${prefix}--pictogramarray__title`}>{title}</h2>
            {_renderArray(contentGroup, React.Children.toArray(children))}
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
 * @param {Array} children Array of JSX pictogram elements
 * @returns {object} JSX Object
 */
const _renderArray = (contentArray, children) =>
  contentArray.map((contentItem, index) => (
    <PictogramArrayItem
      title={contentItem.title}
      pictogram={contentItem.pictogram}
      copy={contentItem.copy}
      link={contentItem.link}>
      {children[index]}
    </PictogramArrayItem>
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
    })
  ),
};

export default PictogramArray;
