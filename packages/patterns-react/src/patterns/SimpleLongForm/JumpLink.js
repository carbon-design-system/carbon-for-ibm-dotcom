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
  /**
   * Scroll to html element of provided id
   *
   * @param {*} e javascript event object
   * @param {*} id id attribute of element
   */
  const scrollToEle = (e, id) => {
    e.preventDefault();
    document
      .getElementById(id)
      .scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <a
      data-autoid={`${stablePrefix}--jumplink`}
      className={`${prefix}--jumplink`}
      onClick={e => scrollToEle(e, href)}>
      <XAxis16
        aria-label="Learn more link"
        className={`${prefix}--jumplink__icon`}
      />
      <span className={`${prefix}--jumplink__text`}>{text}</span>
    </a>
  );
};

JumpLink.propTypes = {
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

export default JumpLink;
