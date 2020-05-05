/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CardGroup } from '../../sub-patterns/CardGroup';
import classNames from 'classnames';
import { ContentSection } from '../../sub-patterns/ContentSection';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;
/**
 * Card section Component
 *
 * @param {object} props props object
 * @param {string} props.heading cards group heading
 * @param {string} props.theme theme name
 * @param {object} props.cta cta object
 * @param {Array} props.cards Array of card
 * @returns {object} JSX Object
 */
const CardSection = ({ heading, theme, cards, cta, ...otherProps }) => {
  /**
   * sets the class name based on theme type
   *
   * @private
   * @param {string} theme theme type ( g10 | g100 | white/default )
   * @returns {string} theme css class names
   */
  const _setTheme = theme => {
    return theme && `${prefix}--card-section--${theme}`;
  };

  return (
    <ContentSection
      heading={heading}
      autoid={otherProps.autoid}
      customClassName={classNames(`${prefix}--card-section`, _setTheme(theme))}>
      <CardGroup cards={cards} cta={cta} />
    </ContentSection>
  );
};

CardSection.propTypes = {
  theme: PropTypes.string,
  heading: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape(CardGroup.propTypes)),
  cta: PropTypes.oneOfType(PropTypes.shape(CardGroup.propTypes)),
};

export default CardSection;
