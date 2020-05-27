/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card } from '../../sub-patterns/Card';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
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
const FeatureCard = ({ card, onClick }) => {
  return (
    card.cta && (
      <div
        className={`${prefix}--feature-card`}
        data-autoid={`${stablePrefix}--feature-card`}>
        <Card
          customClassName={`${prefix}--feature-card__card`}
          type="link"
          inverse={true}
          handleClick={onClick}
          {...card}
        />
      </div>
    )
  );
};

FeatureCard.propTypes = {
  /**
   * Object containing Feature Card details.
   * In summary, has the following structure.
   *
   * | Name      | Data Type | Description                                                                                                                                                                        |
   * | --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `heading` | String    | Title of the Card item.                                                                                                                                                            |
   * | `image`   | Object    | Image object used in the FeatureCard component. See [`<Image>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-image--default#props) for full usage details. |
   * | `cta`     | Object    | Object containing target and href of link. See below.                                                                                                                              |
   *
   * CTA object has the following structure in summary:
   *
   * | Name   | Data Type | Description                       |
   * | ------ | --------- | --------------------------------- |
   * | `href` | String    | Url of the FeatureCard component. |
   *
   * See [`<Card>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/patterns-sub-patterns-card--static#props) for full usage details.
   */
  card: PropTypes.shape({
    heading: PropTypes.string,
    eyebrow: PropTypes.string,
    copy: PropTypes.string,
    cta: PropTypes.shape({
      copy: PropTypes.string,
      href: PropTypes.string,
      type: PropTypes.oneOfType([
        PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']),
        PropTypes.arrayOf(
          PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video'])
        ),
      ]),
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
};

export default FeatureCard;
