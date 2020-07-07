/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useRef } from 'react';
import ContentBlock from '../../../internal/components/ContentBlock/ContentBlock';
import { CTA } from '../../../components/CTA';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import sameHeight from '@carbon/ibmdotcom-utilities/es/utilities/sameHeight/sameHeight';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentBlockHeadlines pattern
 */
const ContentBlockHeadlines = ({ heading, copy, items }) => {
  const containerRef = useRef();
  const contentRows = chunk(items, 2);

  useEffect(() => {
    setSameHeight();
    window.addEventListener('resize', setSameHeight);

    return () => window.removeEventListener('resize', setSameHeight);
  }, []);

  /**
   * Function that activates the sameHeight utility
   */
  const setSameHeight = () => {
    window.requestAnimationFrame(() => {
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

  return (
    <div
      data-autoid={`${stablePrefix}--content-block-headlines`}
      className={`${prefix}--content-block-headlines`}
      ref={containerRef}>
      <ContentBlock heading={heading} copy={copy} border={true}>
        {_renderRows(contentRows)}
      </ContentBlock>
    </div>
  );
};

/**
 * Renders the ContentBlockHeadlines items
 *
 * @param {Array} contentRows array of content rows
 * @private
 * @returns {*} JSX component
 */
const _renderRows = contentRows =>
  contentRows.map((row, index) => (
    <div className={`${prefix}--content-block-headlines__row`} key={index}>
      {row.map((item, index) => (
        <div className={`${prefix}--content-block-headlines__item`} key={index}>
          <h4 className={`${prefix}--content-block-headlines__headline`}>
            {item.headline}
          </h4>
          <p className={`${prefix}--content-block-headlines__copy`}>
            {item.copy}
          </p>
          {item.cta && <CTA {...item.cta} />}
        </div>
      ))}
    </div>
  ));

/**
 * Break out items per row
 *
 * @param {Array} array of items
 * @param {number} size number of items per row
 * @private
 * @returns {Array} array of rows
 */
function chunk(array, size) {
  return array.reduce((chunks, item, i) => {
    if (i % size === 0) {
      chunks.push([item]);
    } else {
      chunks[chunks.length - 1].push(item);
    }
    return chunks;
  }, []);
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
