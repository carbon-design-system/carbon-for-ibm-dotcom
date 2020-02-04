/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ArrowDown20, ArrowRight20, Launch20 } from '@carbon/icons-react';
import { ButtonGroup } from '../../patterns/sub-patterns/ButtonGroup';
import { CardLink } from '../../patterns/sub-patterns/CardLink';
import { FeaturedLink } from '../../patterns/blocks/FeaturedLink';
import { LinkWithIcon } from '../LinkWithIcon';
import PropTypes from 'prop-types';
import React from 'react';
import { smoothScroll } from '@carbon/ibmdotcom-utilities';
/**
 * CTA component
 *
 * @param {object} props props object
 * @param {string} props.style style ( text | card | button | feature ).
 * @param {object} props.type tyle ( jump | local | external ).
 * @param {object} props.cta cta object which includes href,text, copy, card and image, button  properties.
 * @returns {*} CTA Component
 */
const CTA = ({ style, type, ...cta }) => {
  switch (style) {
    case 'card':
      return (
        <CardLink
          {...cta}
          icon={iconSelector(type)}
          target={external(type)}
          onClick={e => jump(e, type)}
        />
      );
    case 'button':
      return (
        <ButtonGroup
          buttons={renderButtons(cta)}
          target={external(type)}
          onClick={e => jump(e, type)}
        />
      );
    case 'feature':
      return <FeaturedLink {...cta} />;
    default:
      return (
        <LinkWithIcon
          href={cta.href}
          target={external(type)}
          onClick={e => jump(e, type)}>
          {cta.copy}
          {iconSelector(type)}
        </LinkWithIcon>
      );
  }
};

/**
 * jump to target element  onClick
 * @param {*} e event object
 * @param {*} type cta type ( external | jump | local)
 * * @returns {*} behaviour object
 */
const jump = (e, type) => (type === 'jump' ? smoothScroll(e) : null);

/**
 * sets target
 * @param {string} type cta type ( external | jump | local)
 * @returns {string} target value
 */
const external = type => (type === 'external' ? '_blank' : null);

/**
 * TEMPORARY sets icon based on link type
 *
 * @param {string} type cta type ( external | jump | local)
 * @returns {*} type of icon component
 */
const TEMP_iconSelector = type =>
  type === 'external' ? Launch20 : type === 'jump' ? ArrowDown20 : ArrowRight20;

/**
 * sets icon based on link type
 *
 * @param {string} type cta type ( external | jump | local)
 * @returns {*} cta type component
 */
const iconSelector = type =>
  type === 'external' ? (
    <Launch20 />
  ) : type === 'jump' ? (
    <ArrowDown20 />
  ) : (
    <ArrowRight20 />
  );

/**
 * sets button
 *
 * @param {object} cta object with buttons array
 * @returns {*} object
 */
const renderButtons = ({ buttons }) =>
  buttons.map(button => {
    button.renderIcon = TEMP_iconSelector(button.type);
    return button;
  });

CTA.propTypes = {
  style: PropTypes.string,
  type: PropTypes.string,
};
export default CTA;
