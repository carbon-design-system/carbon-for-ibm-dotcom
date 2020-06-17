/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { LinkWithIcon } from '../../../components/LinkWithIcon';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Simple benefits item.
 */
const SimpleBenefitsItem = ({ title, copy, link }) => (
  <div
    data-autoid={`${stablePrefix}--simplebenefits__content-item`}
    className={`${prefix}--simplebenefits__content-item`}>
    <div className={`${prefix}--simplebenefits__content-item-container`}>
      <h3 className={`${prefix}--simplebenefits__content-item__title`}>
        {title}
      </h3>
      <div className={`${prefix}--simplebenefits__content-item__divider`}></div>
      <div className={`${prefix}--simplebenefits__content-item__content`}>
        {copy}
      </div>
      {link && (
        <div className={`${prefix}--simplebenefits__content-item__link`}>
          <LinkWithIcon
            href={link.href}
            target={link.target}
            copy={link.text}
          />
        </div>
      )}
    </div>
  </div>
);

SimpleBenefitsItem.propTypes = {
  /**
   * Simple long form title
   */
  title: PropTypes.string,

  /**
   * Simple long form copy.
   */
  copy: PropTypes.string,

  /**
   * Link object which includes url, link text and target properties.
   */
  link: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
    target: PropTypes.string,
  }),
};

export default SimpleBenefitsItem;
