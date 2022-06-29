/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Card } from '../Card';
import classNames from 'classnames';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Featured Card Component
 *
 * @param {object} props props object
 * @param {object} props.card section card object
 * @param {Function} props.onClick onClick function
 * @returns {*} FeatureCard JSX component
 */
const FeatureCard = ({ card, size, ...otherProps }) => {
  const { image, cta, copy } = card;

  return (
    cta &&
    image && (
      <div
        className={classNames({
          [`${prefix}--feature-card`]: size == 'medium',
          [`${prefix}--feature-card-large`]: size == 'large',
          [`${prefix}--feature-card-large_no-copy-text`]:
            size === 'large' && !copy,
        })}
        data-autoid={
          size === 'large'
            ? `${stablePrefix}--feature-card-large`
            : `${stablePrefix}--feature-card`
        }>
        <Card
          customClassName={classNames({
            [`${prefix}--feature-card__card`]: size === 'medium',
            [`${prefix}--feature-card-large__card`]: size === 'large',
          })}
          {...card}
          {...otherProps}
        />
      </div>
    )
  );
};

FeatureCard.propTypes = {
  /**
   * "Eyebrow" text above copy and CTA.
   */
  eyebrow: PropTypes.string,

  /**
   * Title of the Card item.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Body text for the card.
   */
  copy: PropTypes.string,

  /**
   * Object containing Feature Card details.
   * In summary, has the following structure.
   *
   * | Name      | Data Type | Description                                                                                                                                                                        |
   * | --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `heading` | String    | Title of the Card item.                                                                                                                                                            |
   * | `image`   | Object    | Image object used in the FeatureCard component. See [`<Image>`'s README](http://www.ibm.com/standards/carbon/react/?path=/docs/components-image--default#props) for full usage details. |
   * | `cta`     | Object    | Object containing target and href of link. See below.                                                                                                                              |
   *
   * CTA object has the following structure in summary:
   *
   * | Name   | Data Type | Description                       |
   * | ------ | --------- | --------------------------------- |
   * | `href` | String    | Url of the FeatureCard component. |
   *
   * See [`<Card>`'s README](http://www.ibm.com/standards/carbon/react/?path=/docs/components-card--static#props) for full usage details.
   */
  card: PropTypes.shape({
    heading: PropTypes.string,
    eyebrow: PropTypes.string,
    copy: PropTypes.string,
    cta: PropTypes.shape({
      copy: PropTypes.string,
      href: PropTypes.string,
      type: PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']),
    }),
    image: PropTypes.shape({
      classname: PropTypes.string,
      sources: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string,
          breakpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
      ),
      defaultSrc: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      longDescription: PropTypes.string,
    }),
    inverse: PropTypes.bool,
    customClassName: PropTypes.string,
    type: PropTypes.oneOf(['link']),
  }).isRequired,

  /**
   * The handler for `onclick` event.
   */
  onClick: PropTypes.func,

  /**
   * Size of Feature Card. Choose from:
   *
   * | Name    | Description                                                  |
   * | ------- | -------------------------------------------------------------|
   * | `medium`| Default Feature Card variant                                 |
   * | `large` | Large Feature Card variant that contains eyebrow and heading |
   */
  size: PropTypes.oneOf(['medium', 'large']),
};

FeatureCard.defaultProps = {
  size: 'medium',
};

export default FeatureCard;
