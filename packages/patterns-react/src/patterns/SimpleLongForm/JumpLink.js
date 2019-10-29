/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { XAxis16 } from '@carbon/icons-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Jump Link Component
 *
 * @param {object} props props object
 * @param {string} props.href jump link link
 * @param {string} props.text jump link text
 * @returns {*} JumpLink component
 */
const JumpLink = ({ link: { href, text } }) => {
  return (
    <a
      href={href}
      data-autoid={`${stablePrefix}--jumplink`}
      className={`${prefix}--jumplink`}
      onClick={e => _scrollToEle(e, href)}>
      <div className={`${prefix}--list__link__inner`}>
        <XAxis16
          aria-label="Learn more link"
          className={`${prefix}--jumplink__icon`}
        />
        <span className={`${prefix}--jumplink__text`}>{text}</span>
      </div>
    </a>
  );
};

/**
 * Scroll to html element of provided id
 *
 * @private
 * @param {*} e javascript event object
 * @param {*} id id attribute of element
 */
const _scrollToEle = (e, id) => {
  e.preventDefault();
  document
    .getElementById(id)
    .scrollIntoView({ behavior: 'smooth', block: 'center' });
};

JumpLink.propTypes = {
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

export default JumpLink;
