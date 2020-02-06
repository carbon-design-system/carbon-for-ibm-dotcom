/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArrowRight20 } from '@carbon/icons-react';
import { CardLink } from '../../sub-patterns/CardLink';
import classNames from 'classnames';
import { DDS_SIMPLELONGFORM } from '../../../internal/FeatureFlags';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import { LinkWithIcon } from '../../../components/LinkWithIcon';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Simple long form pattern
 *
 * @param {object} props props object
 * @param {boolean} props.border includes border or not ( true | false )
 * @param {string} props.copy simple long form  short copy to support the title
 * @param {string} props.linkType link type ( simple | jump | card )
 * @param {object} props.link link object which includes url, link text and target properties.
 * @param {string} props.theme simple long form theme (g100 | white/default)
 * @param {string} props.title simple long form title
 * @returns {*} Simple long form pattern
 */
const SimpleLongForm = ({ border, copy, linkType, link, theme, title }) =>
  featureFlag(
    DDS_SIMPLELONGFORM,
    <section
      data-autoid={`${stablePrefix}--simplelongform`}
      className={classNames(
        `${prefix}--simplelongform`,
        setLinkType(linkType),
        setBorder(border),
        setTheme(theme)
      )}>
      <div className={`${prefix}--simplelongform__container`}>
        <div className={`${prefix}--simplelongform__row`}>
          <div className={`${prefix}--simplelongform__col`}>
            <h3 className={`${prefix}--simplelongform__title`}>{title}</h3>
            <div className={`${prefix}--simplelongform__content`}>{copy}</div>
            <div
              data-autoid={`${stablePrefix}--simplelongform__link`}
              className={`${prefix}--simplelongform__link`}>
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
      target={data.target}
      icon={ArrowRight20}
      type="link"
    />
  ) : type === 'iconLink' ? (
    <LinkWithIcon href={data.href} target={data.target}>
      <span>{data.text}</span>
      <ArrowRight20 />
    </LinkWithIcon>
  ) : null;
};

/**
 * sets the class name based on link type
 *
 * @param {string} type link type ( iconLink | cardLink )
 * @returns {string} link type css class names
 */
const setLinkType = type => {
  let linkType;
  switch (type) {
    case 'iconLink':
      linkType = `${prefix}--simplelongform--icon-link`;
      break;
    case 'cardLink':
      linkType = `${prefix}--simplelongform--card-link`;
      break;
    default:
  }
  return linkType;
};

/**
 * sets the class name based on theme type
 *
 * @param {string} theme theme type ( g100 | white/default )
 * @returns {string} theme css class names
 */
const setTheme = theme => {
  return theme && `${prefix}--simplelongform--${theme}`;
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
  border: PropTypes.bool,
  copy: PropTypes.string,
  link: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
    target: PropTypes.string,
  }),
  linkType: PropTypes.string,
  theme: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default SimpleLongForm;
