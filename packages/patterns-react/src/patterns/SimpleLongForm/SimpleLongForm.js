/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import { SIMPLELONGFORM } from '../../internal/FeatureFlags';
import JumpLink from './JumpLink';
import CardLink from './CardLink';
import SimpleLink from './SimpleLink';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Simple long form pattern
 *
 * @param {object} props props object
 * @param {string} props.title simple long form title
 * @param {string} props.copy simple long form  short copy to support the title
 * @param {string} props.variation variation of the simple long form standard, standard with jump link and standard with card link
 * @param {object} props.link link object which includes url, link text and target properties.
 * @returns {*} Simple long form pattern
 */
const SimpleLongForm = ({ title, copy, variation, link }) =>
  featureFlag(
    SIMPLELONGFORM,
    <section
      data-autoid={`${stablePrefix}--simplelongform`}
      className={classNames(
        `${prefix}--simplelongform`,
        setVariation(variation)
      )}>
      <div className={`${prefix}--simplelongform__container`}>
        <div className={`${prefix}--simplelongform__row`}>
          <div className={`${prefix}--simplelongform__col`}>
            <h1 className={`${prefix}--simplelongform__title`}>{title}</h1>
            <div className={`${prefix}--simplelongform__content`}>{copy}</div>
          </div>
          <div className={`${prefix}--simplelongform__link__col`}>
            {renderLink(variation, link)}
          </div>
          <div className={`${prefix}--simplelongform__divider__col`}>
            <div className={`${prefix}--simplelongform__divider`}></div>
          </div>
        </div>
      </div>
    </section>
  );

/**
 *
 *
 * @param {object} type variation of pattern (with simple link, jump link or card link)
 * @param {object} data object with href, text & target properties
 * @returns {*} JSX Object
 */
const renderLink = (type, data) => {
  return type === 'standard with jump link' ? (
    <JumpLink link={data} />
  ) : type === 'standard with card link' ? (
    <CardLink link={data} />
  ) : type === 'standard with simple link' ? (
    <SimpleLink link={data} />
  ) : null;
};

/**
 * sets the class name for pattern variations
 *
 * @param {string} type variation of pattern (with simple link, jump link or card link)
 * @returns {string} link type css class names
 */
const setVariation = type => {
  let variation;
  switch (type) {
    case 'standard':
      variation = `${prefix}--simplelongform--standard`;
      break;
    case 'standard with jump link':
      variation = `${prefix}--simplelongform--standard-with-jump-link`;
      break;
    case 'standard with card link':
      variation = `${prefix}--simplelongform--standard-with-card-link`;
      break;
    case 'standard with simple link':
      variation = `${prefix}--simplelongform--standard-with-simple-link`;
      break;
    default:
  }
  return variation;
};

SimpleLongForm.propTypes = {
  title: PropTypes.string.isRequired,
  copy: PropTypes.string,
  variation: PropTypes.string,
  link: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
    target: PropTypes.string,
  }),
};

export default SimpleLongForm;
