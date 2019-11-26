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
import * as Icons from '@carbon/pictograms-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content with pictogram component
 *
 * @param {object} props props object {title, copy, pictogram, link}
 * @param {string} props.title Content with pictogram component title property
 * @param {string} props.copy Content with pictogram component copy property
 * @param {object} props.link Content with pictogram component link object
 * @param {object} props.link.href Content with pictogram component link object href property
 * @param {object} props.link.text Content with pictogram component link object text property
 * @param {object} props.link.target Content with pictogram component link object target property
 * @returns {*} Content array with pictograms item JSX Component
 */
const ContentArrayWithPictogramsItem = ({ title, copy, pictogram, link }) => (
  <div
    data-autoid={`${stablePrefix}--contentarraywithpictograms-item`}
    className={`${prefix}--contentarraywithpictograms-item`}>
    <div className={`${prefix}--contentarraywithpictograms__row`}>
      <div className={`${prefix}--contentarraywithpictograms__col`}>
        {_renderPictogram(
          pictogram,
          `${prefix}--contentarraywithpictograms-item__pictogram`
        )}
      </div>
      <div className={`${prefix}--contentarraywithpictograms__col`}>
        <h3 className={`${prefix}--contentarraywithpictograms-item__title`}>
          {title}
        </h3>
        <div className={`${prefix}--contentarraywithpictograms-item__content`}>
          {copy}
        </div>
        <div className={`${prefix}--contentarraywithpictograms-item__link`}>
          <LinkWithIcon href={link.href} target={link.target}>
            <span>{link.text}</span>
            <ArrowRight20 />
          </LinkWithIcon>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Renders the selected pictogram from the @carbon/icons-react module
 *
 * @param {string} pictogram Pictogram name
 * @param {string} identifier Component className
 * @returns {*} JSX Component
 */
const _renderPictogram = (pictogram, identifier) => {
  const Icon = Icons;
  const Pictogram = Icon[pictogram];
  return (
    <Pictogram
      width="80"
      height="80"
      viewBox="8 8 32 32"
      className={identifier}
    />
  );
};

ContentArrayWithPictogramsItem.propTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
  pictogram: PropTypes.string,
  link: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
    target: PropTypes.string,
  }),
};

export default ContentArrayWithPictogramsItem;
