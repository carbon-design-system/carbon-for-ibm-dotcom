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

/**
 * CTA component
 *
 * @param {object} props props object
 * @param {string} props.style style ( text | card | button | feature ).
 * @param {object} props.type tyle ( jump | local | external ).
 * @param {object} props.cta cta object which includes href,text, copy, card and image, button  properties.
 * @returns {*} CTA Component
 */
const CTA = ({ style, type, ...cta }) =>
  style === 'card' ? (
    <CardLink {...cta} icon={iconSelector(type)} />
  ) : style === 'button' ? (
    <ButtonGroup buttons={renderButtons(cta)} />
  ) : style === 'feature' ? (
    <FeaturedLink
      {...cta}
      //icon={iconSelector(type)}
    />
  ) : type === 'jump' ? (
    <LinkWithIcon
      href={cta.href}
      onClick={e => {
        handleOnClick(e, cta.id);
      }}>
      {cta.copy}
      {iconSelector(type)}
    </LinkWithIcon>
  ) : (
    <LinkWithIcon href={cta.href}>
      {cta.copy}
      {iconSelector(type)}
    </LinkWithIcon>
  );

/**
 * Handle OnClick
 *
 * @param {*} e event object
 * @param {*} id element id
 */
const handleOnClick = (e, id) => {
  e.preventDefault();
  document.querySelector(`[id="${id}"]`).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};
/**
 * TEMPORARY sets icon based on link type
 *
 * @param {string} type cta type ( external | jump | local)
 * @returns {*} cta type component
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
  cta: PropTypes.object,
  style: PropTypes.string,
  type: PropTypes.string,
};

export default CTA;
