/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { Button } from 'carbon-components-react';
import { ArrowRight20, ArrowDown20, Pdf20 } from '@carbon/icons-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Card Array Item Object
 *
 * @param {object} props props object
 * @param {string} props.title Card Title
 * @param {string} props.copy Card copy
 * @param {object} props.link Card link object
 * @returns {*} JSX Card Array Item Object
 */
const CardArrayItem = ({ title, copy, link }) => {
  return (
    <div
      data-autoid={`${stablePrefix}--cardarray-item`}
      className={`${prefix}--cardarray-item`}>
      <h4 className={`${prefix}--cardarray-item__title`}>{title}</h4>
      <p className={`${prefix}--cardarray-item__content`}>{copy}</p>
      <div className={`${prefix}--cardarray-item__link`}>
        <Button
          className={`${prefix}--cardarray-item__link__button`}
          href={link.href}
          target={link.target}
          kind="primary">
          {_renderIcon(link.icon)}
        </Button>
      </div>
    </div>
  );
};

/**
 * Renders the right icon based on the icon variable
 *
 * @param {string} icon Icon name string
 * @returns {*} Icon JSX object
 */
const _renderIcon = icon => {
  switch (icon) {
    case 'ArrowRight':
      return <ArrowRight20 fill="white" />;
    case 'ArrowDown':
      return <ArrowDown20 fill="white" />;
    case 'Pdf':
      return <Pdf20 fill="white" />;
    default:
      return <ArrowRight20 fill="white" />;
  }
};

CardArrayItem.propTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
  link: PropTypes.shape({
    href: PropTypes.string,
    target: PropTypes.string,
    icon: PropTypes.string,
  }),
};

export default CardArrayItem;
