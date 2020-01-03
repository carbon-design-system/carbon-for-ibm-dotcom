/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ArrowRight20 } from '@carbon/icons-react';
import { Button } from 'carbon-components-react';
import PropTypes from 'prop-types';
import React from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Featured Link Item Object
 *
 * @param {object} props props object
 * @param {string} props.title Card Title
 * @param {object} props.link Card link object
 * @returns {*} JSX Featured Link Item Object
 */
const FeaturedLinkItem = ({ title, link }) => {
  return (
    <div
      data-autoid={`${stablePrefix}--featuredlink-item`}
      className={`${prefix}--featuredlink-item`}>
      <h4 className={`${prefix}--featuredlink-item__title`}>{title}</h4>
      <div className={`${prefix}--featuredlink-item__link`}>
        <Button
          className={`${prefix}--featuredlink-item__link__button`}
          href={link.href}
          target={link.target}
          kind="primary">
          <ArrowRight20 fill="white" />
        </Button>
      </div>
    </div>
  );
};

FeaturedLinkItem.propTypes = {
  title: PropTypes.string,
  link: PropTypes.shape({
    href: PropTypes.string,
    target: PropTypes.string,
  }),
};

export default FeaturedLinkItem;
