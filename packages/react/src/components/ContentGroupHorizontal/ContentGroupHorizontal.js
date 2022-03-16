/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ContentBlock from '../ContentBlock/ContentBlock';
import { ContentItemHorizontal } from '../ContentItemHorizontal';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import deprecate from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/deprecate/deprecate.js';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentGroupHorizontal pattern.
 */
const ContentGroupHorizontal = ({ heading, items }) => {
  return (
    <div
      data-autoid={`${stablePrefix}--content-group-horizontal`}
      className={`${prefix}--content-group-horizontal`}>
      <ContentBlock heading={heading} border={true}>
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

ContentGroupHorizontal.propTypes = {
  /**
   * Heading of the content group.
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
};

export default deprecate(
  ContentGroupHorizontal,
  `
  The ContentGroupHorizontal component has been deprecated in favor of the ContentBlockHorizontal component.
  See ContentBlockHorizontal documentation for more information.
`
);
