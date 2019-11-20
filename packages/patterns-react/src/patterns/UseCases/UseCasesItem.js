/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import PropTypes from 'prop-types';
import { ArrowRight20 } from '@carbon/icons-react';
import { LinkWithIcon } from '@carbon/ibmdotcom-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * UsecasesItem
 *
 * @param {object} props props object { lists:{ title, copy, link: { text, href, target}} }
 * @param {string} props.lists.title UsecasesItem title property
 * @param {string} props.lists.copy UsecasesItem copy property
 * @param {object} props.lists.link UsecasesItem link object
 * @param {string} props.lists.link.href UsecasesItem href property of link object
 * @param {string} props.lists.link.title UsecasesItem text property of link object
 * @param {string} props.lists.link.target UsecasesItem target property of link object
 * @returns {object} JSX Object
 */
const UsecasesItem = ({ lists: { title, copy, link } }) => {
  return (
    <div
      data-autoid={`${stablePrefix}--usecases-item`}
      className={`${prefix}--usecases-item`}>
      <h3 className={`${prefix}--usecases-item__title`}>{title}</h3>
      <div className={`${prefix}--usecases-item__content`}>{copy}</div>
      <div className={`${prefix}--usecases-item__link`}>
        {link && (
          <LinkWithIcon href={link.href} target={link.target}>
            <span>{link.title}</span>
            <ArrowRight20 />
          </LinkWithIcon>
        )}
      </div>
    </div>
  );
};

UsecasesItem.propTypes = {
  lists: PropTypes.shape({
    title: PropTypes.string,
    copy: PropTypes.string,
    link: PropTypes.PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string,
      target: PropTypes.string,
    }),
  }),
};

export default UsecasesItem;
