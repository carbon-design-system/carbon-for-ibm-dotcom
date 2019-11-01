/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import { SIMPLELONGFORM } from '../../internal/FeatureFlags';
import { ArrowRight20 } from '@carbon/icons-react';
import { CardLink } from '@carbon/ibmdotcom-react';
import { LinkWithIcon } from '@carbon/ibmdotcom-react';
import '@carbon/ibmdotcom-styles/scss/components/link-with-icon/_link-with-icon.scss';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Simple long form pattern
 *
 * @param {object} props props object
 * @param {string} props.title simple long form title
 * @param {string} props.copy simple long form  short copy to support the title
 * @param {string} props.linkType link type ( simple | jump | card )
 * @param {object} props.link link object which includes url, link text and target properties.
 * @returns {*} Simple long form pattern
 */
const SimpleLongForm = ({ title, copy, linkType, border, link }) =>
  featureFlag(
    SIMPLELONGFORM,
    <section
      data-autoid={`${stablePrefix}--simplelongform`}
      className={classNames(
        `${prefix}--simplelongform`,
        setLinkType(linkType),
        setBorder(border)
      )}>
      <div className={`${prefix}--simplelongform__container`}>
        <div className={`${prefix}--simplelongform__row`}>
          <div className={`${prefix}--simplelongform__col`}>
            <h3 className={`${prefix}--simplelongform__title`}>{title}</h3>
            <div className={`${prefix}--simplelongform__content`}>{copy}</div>
            <div className={`${prefix}--simplelongform__link`}>
              {renderLink(linkType, link)}
            </div>
          </div>
          <div className={`${prefix}--simplelongform__divider__col`}>
            <div className={`${prefix}--simplelongform__divider`}></div>
          </div>
        </div>
      </div>
    </section>
  );

/**
 * renderLink based on link type
 *
 * @param {object} type link type ( simple | jump | card )
 * @param {object} data object with href, text & target properties
 * @returns {*} JSX Object
 */
const renderLink = (type, data) => {
  return type === 'jump' ? (
    <JumpLink link={data} />
  ) : type === 'cardLink' ? (
    <CardLink
      title={data.text}
      href={data.href}
      target={data.target === 'blank' ? '_blank' : '_self'}
      icon={<ArrowRight20 />}
    />
  ) : type === 'iconLink' ? (
    <LinkWithIcon
      href={data.href}
      target={data.target === 'blank' ? '_blank' : '_self'}>
      <span>{data.text}</span>
      <ArrowRight20 />
    </LinkWithIcon>
  ) : null;
};

/**
 * sets the class name based on link type
 *
 * @param {string} type link type ( simple | jump | card )
 * @returns {string} link type css class names
 */
const setLinkType = type => {
  let linkType;
  switch (type) {
    case 'jump':
      linkType = `${prefix}--simplelongform--jump`;
      break;
    case 'card':
      linkType = `${prefix}--simplelongform--card`;
      break;
    case 'simple':
      linkType = `${prefix}--simplelongform--simple`;
      break;
    default:
  }
  return linkType;
};

/**
 * sets the class name based on border type
 *
 * @param {boolean} border includes border or not ( true | false )
 * @returns {string} border type css class names
 */
const setBorder = border => {
  let withBorder;
  withBorder = border === true ? `${prefix}--simplelongform--with-border` : '';
  return withBorder;
};

SimpleLongForm.propTypes = {
  title: PropTypes.string.isRequired,
  copy: PropTypes.string,
  linkType: PropTypes.string,
  border: PropTypes.bool,
  link: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
    target: PropTypes.string,
  }),
};

export default SimpleLongForm;
