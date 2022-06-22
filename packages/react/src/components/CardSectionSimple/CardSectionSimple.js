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
 * CardSectionSimple pattern it is Cards without images.
 */
const CardSectionSimple = ({ cards, cta, theme, ...otherProps }) => {
  const cardsWithoutImages = cards.filter(
    ({ image, heading, copy, cta: { href } }) =>
      !image && heading && copy && href
  );

  return (
    <ContentSection
      heading={otherProps.heading}
      autoid={`${stablePrefix}--card-group-simple-group`}
      customClassName={classNames(`${prefix}--card-group`, {
        [`${prefix}--card-group--${theme}`]: theme,
      })}
      children={[<CardGroup cards={cardsWithoutImages} cta={cta} />]}
    />
  );
};

CardSectionSimple.propTypes = {
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
   * Array of card data. Has the following structure for each items:
   *
   * | Name       | Required | Data Type | Description                            |
   * | ---------- | -------- | --------- | -------------------------------------- |
   * | `copy`     | YES      | String    | Copy of the card.                      |
   * | `heading`  | YES      | String    | Heading of the card.                   |
   * | `cta.href` | YES      | String    | URI for internal or external resource. |
   *
   * See example
   * [card data](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/packages/react/src/components/CardGroup/__stories__/data/cards.js).
   */
  cards: PropTypes.arrayOf(
    PropTypes.exact({
      heading: PropTypes.string,
      copy: PropTypes.string,
      cta: PropTypes.shape({
        href: PropTypes.string,
      }),
    })
  ).isRequired,

  /**
   * Optional CTA card for group. Always displays as last item.
   * See [`<CardGroup>`'s README](http://www.ibm.com/standards/carbon/react/?path=/docs/components-cardgroup--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    heading: PropTypes.string,
    cta: PropTypes.shape({
      href: PropTypes.string,
    }),
  }),
};
export default CardSectionSimple;
