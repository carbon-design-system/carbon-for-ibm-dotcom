/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useRef } from 'react';
import ContentBlock from '../../internal/components/ContentBlock/ContentBlock';
import { CTA } from '../CTA';
import { DDS_CONTENTBLOCK_HEADLINES } from '../../internal/FeatureFlags';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import featureFlag from '@carbon/ibmdotcom-utilities/es/utilities/featureflag/featureflag';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import sameHeight from '@carbon/ibmdotcom-utilities/es/utilities/sameHeight/sameHeight';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentBlockHeadlines pattern
 */
const ContentBlockHeadlines = ({ heading, copy, items }) => {
  const containerRef = useRef();

  useEffect(() => {
    setSameHeight();
    root.addEventListener('resize', setSameHeight);

    return () => root.removeEventListener('resize', setSameHeight);
  }, []);

  /**
   * Function that activates the sameHeight utility
   */
  const setSameHeight = () => {
    root.requestAnimationFrame(() => {
      const { current: containerNode } = containerRef;
      if (containerNode) {
        sameHeight(
          containerNode.getElementsByClassName(
            `${prefix}--content-block-headlines__copy`
          ),
          'md'
        );
      }
    });
  };

  return featureFlag(
    DDS_CONTENTBLOCK_HEADLINES,
    <div
      data-autoid={`${stablePrefix}--content-block-headlines`}
      className={`${prefix}--content-block-headlines`}
      ref={containerRef}>
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
        <h4 className={`${prefix}--content-block-headlines__headline`}>
          {item.headline}
        </h4>
        <p className={`${prefix}--content-block-headlines__copy`}>
          {item.copy}
        </p>
        {item.cta && <CTA {...item.cta} />}
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
   * See [CTA](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#text-link) for full usage details.
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
