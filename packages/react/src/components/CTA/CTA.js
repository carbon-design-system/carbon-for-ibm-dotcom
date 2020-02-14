/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArrowDown20, ArrowRight20, Launch20 } from '@carbon/icons-react';
import { ButtonGroup } from '../../patterns/sub-patterns/ButtonGroup';
import { Card } from '../../patterns/sub-patterns/Card';
import { FeaturedLink } from '../../patterns/blocks/FeaturedLink';
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
 * @param {string} props.customClassname custom classname from parent
 * @returns {*} CTA component
 */
const CTA = ({ style, type, customClassname, ...cta }) => (
  <div className={customClassname}>{renderCTA({ style, type, ...cta })}</div>
);

/**
 * renders CTA component
 *
 * @param {object} props props object
 * @param {string} props.style cta style ( text | card | button | feature ).
 * @param {string} props.type cta type ( jump | local | external ).
 * @returns {*} CTA Component
 */
const renderCTA = ({ style, type, ...cta }) => {
  switch (style) {
    case 'card':
      return (
        <Card
          className={`${prefix}--card--CTA`}
          title={cta.title}
          href={cta.href}
          type="link"
          icon={_iconSelector(type)}
          target={_external(type)}
          handleClick={e => _jump(e, type)}
        />
      );
    case 'button':
      return <ButtonGroup buttons={_renderButtons(cta)} />;
    case 'feature':
      return (
        <FeaturedLink
          heading={cta.heading}
          card={_renderFeatureCard(cta.card)}
        />
      );
    default: {
      const Icon = _iconSelector(type);
      return (
        <LinkWithIcon
          href={cta.href}
          target={_external(type)}
          onClick={e => _jump(e, type)}>
          {cta.copy}
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
 * @param {object} cta object with buttons array
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
  customClassname: PropTypes.string,
};
export default CTA;
