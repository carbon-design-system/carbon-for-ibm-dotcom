/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ContentBlock from '../ContentBlock/ContentBlock';
import { CTA } from '../CTA';
import { DDS_CONTENTBLOCK_HEADLINES } from '../../internal/FeatureFlags';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import featureFlag from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/featureflag/featureflag';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentBlockHeadlines pattern
 */
const ContentBlockHeadlines = ({ heading, copy, items }) => {
  return featureFlag(
    DDS_CONTENTBLOCK_HEADLINES,
    <div
      data-autoid={`${stablePrefix}--content-block-headlines`}
      className={`${prefix}--content-block-headlines`}>
      <ContentBlock heading={heading} copy={copy} border={true}>
        <div className={`${prefix}--content-block-headlines__container`}>
          <div className={`${prefix}--content-block-headlines__row`}>
            <div
              className={`${prefix}--content-block-headlines__item-container`}>
              {renderItems(items)}
            </div>
          </div>
        </div>
      </ContentBlock>
    </div>
  );
};

/**
 * Renders the ContentBlockHeadlines items
 *
 * @param {Array} items array of content rows
 * @private
 * @returns {*} JSX component
 */
function renderItems(items) {
  const headlineItems = [];

  items.forEach((item, index) => {
    headlineItems.push(
      <div className={`${prefix}--content-block-headlines__item`} key={index}>
        <h4 className={`${prefix}--content-block-headlines__heading`}>
          {item.headline}
        </h4>
        <p className={`${prefix}--content-block-headlines__copy`}>
          {item.copy}
        </p>
        {item.cta && (
          <CTA
            customClassName={`${prefix}--content-block-headlines__cta-container`}
            {...item.cta}
          />
        )}
      </div>
    );
  });

  return headlineItems;
}

ContentBlockHeadlines.propTypes = {
  /**
   * Heading of the content block.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Intro copy of the content block.
   */
  copy: PropTypes.string.isRequired,

  /**
   * Array of content items.
   * See [CTA](http://www.ibm.com/standards/carbon/react/?path=/docs/components-cta--default#text-link) for full usage details.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      headline: PropTypes.string.isRequired,
      copy: PropTypes.string.isRequired,
      cta: PropTypes.shape({
        type: PropTypes.oneOfType([
          PropTypes.oneOf([
            'local',
            'download',
            'jump',
            'external',
            'video',
            'default',
          ]),
          PropTypes.arrayOf(
            PropTypes.oneOf([
              'local',
              'download',
              'jump',
              'external',
              'video',
              'default',
            ])
          ),
        ]),
        copy: PropTypes.string,
        href: PropTypes.string,
        customClassName: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default ContentBlockHeadlines;
