/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArrowDown20, ArrowRight20, Launch20 } from '@carbon/icons-react';
import { ButtonGroup } from '../../patterns/sub-patterns/ButtonGroup';
import { Card } from '../../patterns/sub-patterns/Card';
import { FeatureCardBlockMedium } from '../../patterns/blocks/FeatureCardBlockMedium';
import { LinkWithIcon } from '../LinkWithIcon';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import { smoothScroll } from '@carbon/ibmdotcom-utilities';

const { prefix } = settings;

/**
 * CTA component
 *
 * @param {object} props props object
 * @param {string} props.style cta style ( text | card | button | feature ).
 * @param {string} props.type cta type ( jump | local | external ).
 * @param {string} props.customClassName custom classname from parent
 * @returns {*} CTA component
 */
const CTA = ({ style, type, customClassName, ...otherProps }) => (
  <div className={customClassName}>
    {renderCTA({ style, type, ...otherProps })}
  </div>
);

/**
 * renders CTA component
 *
 * @param {object} props props object
 * @param {string} props.style cta style ( text | card | button | feature ).
 * @param {string} props.type cta type ( jump | local | external ).
 * @returns {*} CTA Component
 */
const renderCTA = ({ style, type, ...otherProps }) => {
  switch (style) {
    case 'card':
      return (
        <Card
          customClassName={`${prefix}--card__CTA`}
          cta={{
            href: otherProps.cta.href,
            icon: {
              src: _iconSelector(type),
            },
          }}
          copy={otherProps.copy}
          type="link"
          target={_external(type)}
          handleClick={e => _jump(e, type)}
          role="region"
        />
      );
    case 'button':
      return <ButtonGroup buttons={_renderButtons(otherProps)} />;
    case 'feature':
      return (
        <FeatureCardBlockMedium
          heading={otherProps.heading}
          card={_renderFeatureCard(otherProps.card)}
        />
      );
    default: {
      const Icon = _iconSelector(type);
      const href = otherProps.href ? otherProps.href : otherProps.cta.href;
      return (
        <LinkWithIcon
          href={href}
          target={_external(type)}
          onClick={e => _jump(e, type)}>
          {otherProps.copy}
          <Icon />
        </LinkWithIcon>
      );
    }
  }
};

/**
 * jump to target element  onClick
 *
 * @param {*} e event object
 * @param {string} type cta type ( external | jump | local)
 * @private
 * @returns {*} behaviour object
 */
const _jump = (e, type) => (type === 'jump' ? smoothScroll(e) : null);

/**
 * sets target
 *
 * @param {string} type cta type ( external | jump | local)
 * @private
 * @returns {string} target value
 */
const _external = type => (type === 'external' ? '_blank' : null);

/**
 * sets icon based on link type
 *
 * @param {string} type cta type ( external | jump | local)
 * @private
 * @returns {*} cta type component
 */
const _iconSelector = type =>
  type === 'external' ? Launch20 : type === 'jump' ? ArrowDown20 : ArrowRight20;

/**
 * sets button
 *
 * @param {object} buttons object with buttons array
 * @private
 * @returns {*} object
 */
const _renderButtons = ({ buttons }) =>
  buttons.map(button => {
    button.renderIcon = _iconSelector(button.type);
    button.onClick = e => _jump(e, button.type);
    button.target = _external(button.type);
    return button;
  });

/**
 * sets featureCard
 *
 * @param {object} featureCard object with card object
 * @private
 * @returns {*} object
 */
const _renderFeatureCard = featureCard => {
  featureCard.icon = _iconSelector(featureCard.type);
  featureCard.handleClick = e => _jump(e, featureCard.type);
  featureCard.target = _external(featureCard.type);
  featureCard.type = 'link';
  return featureCard;
};

CTA.propTypes = {
  style: PropTypes.string,
  type: PropTypes.string,
  customClassName: PropTypes.string,
};

export default CTA;
