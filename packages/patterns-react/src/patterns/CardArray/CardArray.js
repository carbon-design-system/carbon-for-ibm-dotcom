/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CardLink, ContentGroup } from '@carbon/ibmdotcom-react';
import React, { useEffect, useRef } from 'react';
import {
  settings as ddsSettings,
  featureFlag,
} from '@carbon/ibmdotcom-utilities';
import { markdownToHtml, sameheight } from '@carbon/ibmdotcom-utilities';

import { ArrowRight20 } from '@carbon/icons-react';
import { DDS_CARD_ARRAY } from '../../internal/FeatureFlags';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { prefix } = settings;
const { stablePrefix } = ddsSettings;
/**
 * Card Array Component
 *
 * @param {object} props props object
 * @param {string} props.title CardArray section title
 * @param {Array} props.content CardArray section content object array
 * @returns {*} CardArray JSX component
 */
const CardArray = ({ title, content }) => {
  const containerRef = useRef();

  useEffect(() => {
    setSameHeight();
    window.addEventListener('resize', setSameHeight);
  });

  /**
   * Function that activates the sameheight utility
   */
  const setSameHeight = () => {
    sameheight(
      containerRef.current.getElementsByClassName(
        `${prefix}--card-link__title`
      ),
      'md'
    );
    sameheight(containerRef.current.children, 'md');
  };

  return featureFlag(
    DDS_CARD_ARRAY,
    <section data-autoid={`${stablePrefix}--cardarray`}>
      <ContentGroup heading={{ copy: title }}>
        <div
          className={`${prefix}--cardarray`}
          data-autoid={`${stablePrefix}--cardarray`}>
          <div
            data-autoid={`${stablePrefix}--cardarray-group`}
            ref={containerRef}
            className={`${prefix}--cardarray__col ${prefix}--cardarray-group`}>
            {_renderCardArrayItems(content)}
          </div>
        </div>
      </ContentGroup>
    </section>
  );
};

/**
 * Renders the cards based on the ContentArray entries
 *
 * @param {Array} contentArray Content object array
 * @returns {*} CardArrayItem JSX objects
 */
const _renderCardArrayItems = contentArray =>
  contentArray.map((elem, index) => (
    <CardLink
      data-autoid={`${stablePrefix}--cardarray-item`}
      className={`${prefix}--cardarray-item`}
      title={elem.title}
      content={
        <span
          dangerouslySetInnerHTML={{
            __html: markdownToHtml(elem.copy),
          }}></span>
      }
      icon={<ArrowRight20 />}
      href={elem.href}
      key={index}
    />
  ));

CardArray.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      copy: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

export default CardArray;
