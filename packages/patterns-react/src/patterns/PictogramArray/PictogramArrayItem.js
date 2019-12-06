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
 * Content with pictogram component
 *
 * @param {object} props props object {title, copy, pictogram, link}
 * @param {string} props.title Content with pictogram component title property
 * @param {string} props.copy Content with pictogram component copy property
 * @param {object} props.link Content with pictogram component link object
 * @param {object} props.link.href Content with pictogram component link object href property
 * @param {object} props.link.text Content with pictogram component link object text property
 * @param {object} props.link.target Content with pictogram component link object target property
 * @param {*} props.Pictogram Content with pictogram component Pictogram component
 * @returns {*} Content array with pictograms item JSX Component
 */
const PictogramArrayItem = ({ title, copy, link, Pictogram }) => (
  <div
    data-autoid={`${stablePrefix}--pictogramarray-item`}
    className={`${prefix}--pictogramarray-item`}>
    <div className={`${prefix}--pictogramarray__row`}>
      <div className={`${prefix}--pictogramarray__col`}>
        <Pictogram
          className={`${prefix}--pictogramarray-item__pictogram`}
          viewBox="8 8 32 32"
          height="80"
          width="80"
        />
      </div>
      <div className={`${prefix}--pictogramarray__col`}>
        <h3 className={`${prefix}--pictogramarray-item__title`}>{title}</h3>
        <div className={`${prefix}--pictogramarray-item__content`}>{copy}</div>
        <div className={`${prefix}--pictogramarray-item__link`}>
          <LinkWithIcon href={link.href} target={link.target}>
            <span>{link.text}</span>
            <ArrowRight20 />
          </LinkWithIcon>
        </div>
      </div>
    </div>
  </div>
);

PictogramArrayItem.propTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
  link: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
    target: PropTypes.string,
  }),
  Pictogram: PropTypes.object,
};

export default PictogramArrayItem;
