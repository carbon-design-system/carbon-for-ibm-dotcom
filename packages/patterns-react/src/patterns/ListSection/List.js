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

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * List Component
 *
 * @param {object}  props props object { lists:{ title, copy, link: { href, target}} }
 * @param {string} props.lists.title List component title property
 * @param {string} props.lists.copy List component copy property
 * @param {object} props.lists.link List Component link object
 * @param {string} props.lists.link.href List Component href property of link object
 * @param {string} props.lists.link.target List Component target property of link object
 * @returns {object} JSX Object
 */
const List = ({
  lists: {
    title,
    copy,
    link: { href, target },
  },
}) => {
  return (
    <div
      data-autoid={`${stablePrefix}--list`}
      className={`${prefix}--list ${prefix}--list__col`}>
      <div className={`${prefix}--list__title`}>{title}</div>
      <div className={`${prefix}--list__content`}>{copy}</div>
      <a
        className={`${prefix}--list__link`}
        href={href}
        target={target === 'blank' ? '_blank' : '_self'}>
        <div className={`${prefix}--list__link__inner`}>
          <span className={`${prefix}--list__link__text`}> Learn more</span>
          <ArrowRight20
            aria-label="Learn more link"
            className={`${prefix}--list__link__icon`}
          />
        </div>
      </a>
    </div>
  );
};

List.propTypes = {
  lists: PropTypes.shape({
    title: PropTypes.string,
    copy: PropTypes.string,
    link: PropTypes.PropTypes.shape({
      href: PropTypes.string,
      target: PropTypes.string,
    }),
  }),
};

export default List;
