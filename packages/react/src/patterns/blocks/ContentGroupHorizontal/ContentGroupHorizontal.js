/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ContentBlock from '../../../internal/components/ContentBlock/ContentBlock';
import { ContentItemHorizontal } from '../../../components/ContentItemHorizontal';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentGroupHorizontal pattern.
 */
const ContentGroupHorizontal = ({ heading, items, border }) => {
  return (
    <div
      data-autoid={`${stablePrefix}--content-group-horizontal`}
      className={`${prefix}--content-group-horizontal`}>
      <ContentBlock
        heading={heading}
        aside={{
          items: <div></div>,
          border: border,
        }}>
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
   * See [`<ContentItemHorizontal>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-contentitemhorizontal--default#props) for full usage details.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      eyebrow: PropTypes.string,
      heading: PropTypes.string.isRequired,
      copy: PropTypes.string.isRequired,
      cta: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.oneOf(['local', 'external']).isRequired,
          href: PropTypes.string.isRequired,
          copy: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
  /**
   * `true` to use the optional border at the bottom of pattern.
   */
  border: PropTypes.bool,
};

ContentGroupHorizontal.defaultProps = {
  border: true,
};

export default ContentGroupHorizontal;
