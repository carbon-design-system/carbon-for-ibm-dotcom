/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CardGroup } from '../../sub-patterns/CardGroup';
import classNames from 'classnames';
import { ContentSection } from '../../sub-patterns/ContentSection';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * CardSectionSimple pattern it is Cards without images
 *
 * @param {object} props props object
 * @param {Array} props.cards array of card
 * @param {object} props.cta cta object
 * @param {string} props.theme theme of cards
 * @returns {object} JSX Object
 */
const CardSectionSimple = ({ cards, cta, theme, ...otherProps }) => {
  const cardsWithoutImages = cards.filter(
    ({ image, eyebrow, heading, copy, cta: { href } }) =>
      !image && !eyebrow && heading && copy && href
  );

  /**
   * sets the class name based on theme type
   *
   * @private
   * @param {string} theme theme type ( g10 | g100 | white/default )
   * @returns {string} theme css class names
   */
  const _setTheme = theme => {
    return theme && `${prefix}--card-group--${theme}`;
  };

  return (
    <ContentSection
      heading={otherProps.heading}
      autoid={`${stablePrefix}--card-group-simple-group`}
      customClassName={classNames(`${prefix}--card-group`, _setTheme(theme))}>
      <CardGroup cards={cardsWithoutImages} cta={cta} />
    </ContentSection>
  );
};

CardSectionSimple.propTypes = {
  theme: PropTypes.string,
  heading: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.exact({
      heading: PropTypes.string,
      copy: PropTypes.string,
      cta: PropTypes.object,
    })
  ),
  cta: PropTypes.object,
};
export default CardSectionSimple;
