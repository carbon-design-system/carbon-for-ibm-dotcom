/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import ContentGroup from '../../../internal/components/ContentGroup/ContentGroup';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { PictogramItem } from '../../../components/PictogramItem';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content group — with pictograms.
 */
const ContentGroupPictograms = ({ heading, items, className, copy }) => (
  <div
    data-autoid={`${stablePrefix}--content-group-pictograms`}
    className={classNames(className, `${prefix}--content-group-pictograms`)}>
    <ContentGroup heading={heading} copy={copy}>
      {_renderItems(items)}
    </ContentGroup>
  </div>
);

/**
 * Renders the array of items
 *
 * @param {Array} items Array of items for PictogramItem
 * @returns {*} PictogramItem JSX components
 */
const _renderItems = items =>
  items.map((item, index) => (
    <PictogramItem
      className={`${prefix}--content-group-pictograms__item`}
      data-autoid={`${prefix}--content-group-pictograms__item`}
      {...item}
      key={index}
    />
  ));

ContentGroupPictograms.propTypes = {
  /**
   * Main title of Content Group — with Pictograms pattern.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Copy text (enabled for the `markdownToHtml` utility)
   */
  copy: PropTypes.string,

  /**
   * Array of PictogramItems.
   * See [`<PictogramItem>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-pictogramitem--default#props) for full usage details.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      copy: PropTypes.string.isRequired,
      cta: PropTypes.shape({
        style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),
        type: PropTypes.oneOfType([
          PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']),
          PropTypes.arrayOf(
            PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video'])
          ),
        ]),
        copy: PropTypes.string,
        href: PropTypes.string,
        customClassName: PropTypes.string,
      }),
      pictogram: PropTypes.shape({
        src: PropTypes.object.isRequired,
      }),
      className: PropTypes.string,
    })
  ).isRequired,

  /**
   * The CSS class name to apply to the top-level element.
   */
  className: PropTypes.string,
};

export default ContentGroupPictograms;
