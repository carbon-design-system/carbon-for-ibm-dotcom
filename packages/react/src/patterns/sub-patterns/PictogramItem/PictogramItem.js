/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import ContentItem from '../ContentItem/ContentItem';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content with pictogram component.
 */
const PictogramItem = ({
  heading,
  copy,
  pictogram: { src: Pictogram, ...pictogramProps },
  cta,
  className,
}) => (
  <div className={classNames(className, `${prefix}--pictogram-item`)}>
    <div className={`${prefix}--pictogram-item__row`}>
      <div className={`${prefix}--pictogram-item__wrapper`}>
        <Pictogram
          data-autoid={`${stablePrefix}--pictogram-item__pictogram`}
          className={`${prefix}--pictogram-item__pictogram`}
          {...pictogramProps}
        />
      </div>
      <div
        data-autoid={`${stablePrefix}--pictogram-item__content`}
        className={`${prefix}--pictogram-item__content`}>
        <ContentItem
          heading={heading}
          copy={copy}
          cta={cta && { style: 'text', ...cta }}
        />
      </div>
    </div>
  </div>
);

PictogramItem.propTypes = {
  /**
   * Content with pictogram component title property.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Content with pictogram component copy property.
   */
  copy: PropTypes.string.isRequired,

  /**
   * Object with CTA data.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
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

  /**
   * Pictogram data object.
   * The structure is:
   *
   * | Name  | Required | Data Type | Default Value | Description                                                  |
   * | ----- | -------- | --------- | ------------- | ------------------------------------------------------------ |
   * | `src` | YES      | Component | null          | Pictogram component imported from `@carbon/pictograms-react` |
   */
  pictogram: PropTypes.shape({
    src: PropTypes.object.isRequired,
  }),

  /**
   * Pictogram Item `className`` prop.
   */
  className: PropTypes.string,
};

export default PictogramItem;
