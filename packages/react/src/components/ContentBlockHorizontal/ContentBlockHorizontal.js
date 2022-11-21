/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ContentBlock from '../ContentBlock/ContentBlock';
import { ContentItemHorizontal } from '../ContentItemHorizontal';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentBlockHorizontal pattern.
 */
const ContentBlockHorizontal = ({ heading, items, border }) => {
  return (
    <div
      data-autoid={`${stablePrefix}--content-block-horizontal`}
      className={`${prefix}--content-block-horizontal`}
    >
      <ContentBlock heading={heading} border={border}>
        {items.map((item, index) => (
          <ContentItemHorizontal
            eyebrow={item.eyebrow}
            heading={item.heading}
            copy={item.copy}
            cta={item.cta}
            key={index}
          />
        ))}
      </ContentBlock>
    </div>
  );
};

ContentBlockHorizontal.propTypes = {
  /**
   * Heading of the content block.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Array of content items.
   * See [`<ContentItemHorizontal>`'s README](http://www.ibm.com/standards/carbon/react/?path=/docs/components-contentitemhorizontal--default#props) for full usage details.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      eyebrow: PropTypes.string,
      heading: PropTypes.string.isRequired,
      copy: PropTypes.string.isRequired,
      cta: PropTypes.shape({
        heading: PropTypes.string,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            type: PropTypes.oneOfType([
              PropTypes.oneOf(['local', 'external']),
              PropTypes.arrayOf(PropTypes.oneOf(['local', 'external'])),
            ]),
            copy: PropTypes.string,
            href: PropTypes.string,
            customClassName: PropTypes.string,
          })
        ).isRequired,
        iconPlacement: PropTypes.oneOf(['left', 'right']),
      }),
    })
  ).isRequired,

  /**
   * border for content block.
   */
  border: PropTypes.bool,
};

export default ContentBlockHorizontal;
