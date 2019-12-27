/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useLayoutEffect } from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import { DDS_SIMPLEBENEFITSBAND } from '../../internal/FeatureFlags';
import SimpleBenefitsBandItem from './SimpleBenefitsBandItem';
import root from 'window-or-global';
import { sameheight } from '@carbon/ibmdotcom-utilities';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Simple benefits band pattern
 *
 * @param {object} props props object
 * @param {string} props.title Section title
 * @param {Array} props.contentGroup Array of objects containing the cards data
 * @returns {*} Simple benefits band item
 */
const SimpleBenefitsBand = ({ title, contentGroup }) => {
  useLayoutEffect(() => {
    root.addEventListener(
      'resize',
      sameheight(
        document.querySelectorAll(
          `.${prefix}--simplebenefitsband__cards-item__title`
        ),
        'md'
      )
    );
  });

  return featureFlag(
    DDS_SIMPLEBENEFITSBAND,
    <section
      data-autoid={`${stablePrefix}--simplebenefitsband`}
      className={`${prefix}--simplebenefitsband`}>
      <div className={`${prefix}--simplebenefitsband__container`}>
        <div className={`${prefix}--simplebenefitsband__row`}>
          <h2 className={`${prefix}--simplebenefitsband__title`}>{title}</h2>
          <div className={`${prefix}--simplebenefitsband__cards`}>
            {_renderArray(contentGroup)}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Render the content in array list
 *
 * @private
 * @param {Array} contentArray contentGroup object array
 * @returns {object} JSX Object
 */
const _renderArray = contentArray =>
  contentArray.map(contentItem => (
    <SimpleBenefitsBandItem
      title={contentItem.title}
      copy={contentItem.copy}
      link={contentItem.link}
    />
  ));

SimpleBenefitsBand.propTypes = {
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
  title: PropTypes.string.isRequired,
};

export default SimpleBenefitsBand;
