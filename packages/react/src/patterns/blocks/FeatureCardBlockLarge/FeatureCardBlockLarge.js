/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card } from '../../sub-patterns/Card';
import classNames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Featured Card Component
 *
 * @param {object} props props object
 * @param {string} props.eyebrow card eyebrow text
 * @param {string} props.heading card heading text
 * @param {string} props.copy card heading text
 * @param {object} props.image card image object
 * @param {object} props.cta card cta object
 * @returns {*} FeatureCardBlockLarge JSX component
 */
const FeatureCardBlockLarge = props => {
  return (
    props.eyebrow &&
    props.heading &&
    props.image &&
    props.cta && (
      <section
        className={classNames(`${prefix}--feature-card-block-large`, {
          [`${prefix}--feature-card-block-large_no-copy-text`]: !props.copy,
        })}
        data-autoid={`${stablePrefix}--feature-card-block-large`}>
        <Card
          customClassName={`${prefix}--feature-card-block-large__card`}
          {...props}
          type="link"
          inverse={true}
        />
      </section>
    )
  );
};

FeatureCardBlockLarge.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  copy: PropTypes.string,
  cta: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
};

export default FeatureCardBlockLarge;
