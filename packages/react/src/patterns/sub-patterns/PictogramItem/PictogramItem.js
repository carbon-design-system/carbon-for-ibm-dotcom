/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentItem from '../ContentItem/ContentItem';
import {
  settings as ddsSettings,
  // markdownToHtml,
} from '@carbon/ibmdotcom-utilities';
//   import { ArrowRight20 } from '@carbon/icons-react';
//   import { LinkWithIcon } from '../../../components/LinkWithIcon';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Converts markdown to html and returns object to be used in `dangerouslySetInnerHTML`
 *
 * @param {string} string string to be converted to html
 * @returns {object} object with a __html key containing converted string
 */
//   const convertMarkdown = string => ({
//     __html: markdownToHtml(string, {
//       bold: false,
//     }),
//   });

/**
 * Content with pictogram component
 *
 * @param {object} props props object {title, copy, pictogram, link}
 * @param {string} props.heading Content with pictogram component title property
 * @param {string} props.copy Content with pictogram component copy property
 * @param {*} props.Pictogram Content with pictogram component Pictogram component
 * @returns {*} Content array with pictograms item JSX Component
 */
const PictogramItem = ({ heading, copy, Pictogram, cta }) => (
  <div
    data-autoid={`${stablePrefix}--pictogram-item`}
    className={`${prefix}--pictogram-item`}>
    <div className={`${prefix}--pictogram-item__row`}>
      <div className={`${prefix}--pictogram-item__pic-col`}>
        <Pictogram
          className={`${prefix}--pictogram-item__pictogram`}
          viewBox="8 8 32 32"
          height="80"
          width="80"
        />
      </div>
      <div className={`${prefix}--pictogram-item__content-col`}>
        <ContentItem heading={heading} copy={copy} cta={cta} />
      </div>
    </div>
  </div>
);

PictogramItem.propTypes = {
  heading: PropTypes.string,
  copy: PropTypes.string,
  cta: PropTypes.object,
  Pictogram: PropTypes.object,
};

export default PictogramItem;
