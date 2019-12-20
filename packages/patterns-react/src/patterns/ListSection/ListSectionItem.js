/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArrowRight20 } from '@carbon/icons-react';
import { LinkWithIcon } from '@carbon/ibmdotcom-react';
import PropTypes from 'prop-types';
import React from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * List Component
 *
 * @param {object}  props props object { lists:{ title, copy, link: { href, target}} }
 * @param {string} props.lists.title List component title property
 * @param {string} props.lists.copy List component copy property
 * @param {object} props.lists.link List Component link object
 * @returns {object} JSX Object
 */
const ListSectionItem = ({ lists: { title, copy, link } }) => {
  return (
    <div
      data-autoid={`${stablePrefix}--listsection-item`}
      className={`${prefix}--listsection-item`}>
      <h3 className={`${prefix}--listsection-item__title`}>{title}</h3>
      <div className={`${prefix}--listsection-item__content`}>{copy}</div>
      <div
        data-autoid={`${stablePrefix}--listsection-item__link`}
        className={`${prefix}--listsection-item__link`}>
        {link && (
          <LinkWithIcon href={link.href} target={link.target}>
            <span>{link.text}</span>
            <ArrowRight20 />
          </LinkWithIcon>
        )}
      </div>
    </div>
  );
};

ListSectionItem.propTypes = {
  lists: PropTypes.shape({
    title: PropTypes.string,
    copy: PropTypes.string,
    link: PropTypes.PropTypes.shape({
      href: PropTypes.string,
      text: PropTypes.string,
      target: PropTypes.string,
    }),
  }),
};

export default ListSectionItem;
