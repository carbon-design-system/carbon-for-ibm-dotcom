/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CardGroup } from '../CardGroup';
import classNames from 'classnames';
import ContentSection from '../ContentSection/ContentSection';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * CardSectionImages pattern it is Cards with images.
 */
const CardSectionImages = ({ cards, theme, ...otherProps }) => {
  const cardsWithImages = cards.filter(
    ({ image, eyebrow, heading, copy, cta: { href } }) =>
      image && eyebrow && heading && !copy && href
  );

  return (
    <ContentSection
      heading={otherProps.heading}
      autoid={`${stablePrefix}--card-group-images-group`}
      customClassName={classNames(`${prefix}--card-group`, {
        [`${prefix}--card-group--${theme}`]: theme,
      })}
      children={[<CardGroup cards={cardsWithImages} />]}
    />
  );
};

CardSectionImages.propTypes = {
  /**
   * Color theme for pattern. Choose from:
   *
   * | Name    | Data Type | Description                  |
   * | ------- | --------- | ---------------------------- |
   * | `white` | String    | Carbon White theme           |
   * | `g10`   | String    | Carbon Gray 10 (g10) theme   |
   * | `g90`   | String    | Carbon Gray 90 (g90) theme   |
   * | `g100`  | String    | Carbon Gray 100 (g100) theme |
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100']),

  /**
   * Section heading.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Cards data. Has the following structure for each items:
   *
   * | Name       | Required | Data Type | Description                              |
   * | ---------- | -------- | --------- | ---------------------------------------- |
   * | `image`    | YES      | Object    | Contains source and alt text properties. |
   * | `eyebrow`  | YES      | String    | Eyebrow of the card.                     |
   * | `heading`  | YES      | String    | Heading of the card.                     |
   * | `cta.href` | YES      | String    | URI for internal or external resource.   |
   *
   * See example
   * [card data](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/packages/react/src/components/CardGroup/__stories__/data/cards.js).
   */
  cards: PropTypes.arrayOf(
    PropTypes.exact({
      image: PropTypes.shape({
        classname: PropTypes.string,
        sources: PropTypes.arrayOf(
          PropTypes.shape({
            src: PropTypes.string,
            breakpoint: PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number,
            ]),
          })
        ),
        defaultSrc: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        longDescription: PropTypes.string,
      }),
      eyebrow: PropTypes.string,
      heading: PropTypes.string,
      cta: PropTypes.shape({
        href: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default CardSectionImages;
