/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ArrowRight20 } from '@carbon/icons-react';
import { CardLink } from '@carbon/ibmdotcom-react';
import { DDS_FEATURED_LINK } from '../../internal/FeatureFlags';
// import FeaturedLinkItem from './FeaturedLinkItem';
// import { Image } from '@carbon/ibmdotcom-react';
import PropTypes from 'prop-types';
import React from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;
/**
 * Featured Link Component
 *
 * @param {object} images props object
 * @returns {*} FeaturedLink JSX component
 */
// const sortImages = images => {
//   return [
//     {
//       minWidth: 1056,
//       url: images.default,
//     },
//     {
//       minWidth: 672,
//       url: images.tablet,
//     },
//     {
//       minWidth: 320,
//       url: images.mobile,
//     },
//   ];
// };

/**
 * Featured Link Component
 *
 * @param {object} props props object
 * @param {string} props.title FeaturedLink section title
 * @param {Array} props.card FeaturedLink section card object
 * @returns {*} FeaturedLink JSX component
 */
const FeaturedLink = ({ title, card }) => {
  return featureFlag(
    DDS_FEATURED_LINK,
    <section
      className={`${prefix}--featuredlink`}
      data-autoid={`${stablePrefix}--featuredlink`}>
      <div className={`${prefix}--featuredlink__container`}>
        <div className={`${prefix}--featuredlink__row`}>
          <div className={`${prefix}--featuredlink__col`}>
            <h3 className={`${prefix}--featuredlink__title`}>{title}</h3>
            <CardLink
              className={`${prefix}--featuredlink__card`}
              {...card}
              icon={<ArrowRight20 />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturedLink.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  image: PropTypes.object,
};

export default FeaturedLink;
