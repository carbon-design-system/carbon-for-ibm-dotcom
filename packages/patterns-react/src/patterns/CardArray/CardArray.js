/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import { DDS_CARD_ARRAY } from '../../internal/FeatureFlags';
import CardArrayItem from './CardArrayItem';
import { sameheight } from '@carbon/ibmdotcom-utilities';
import { ContentGroup } from '@carbon/ibmdotcom-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

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
      <ContentGroup heading={{ copy: title, type: 'heading-4' }}>
        <div
          className={`${prefix}--cardarray`}
          data-autoid={`${stablePrefix}--cardarray`}>
          <div
            data-autoid={`${stablePrefix}--cardarray-group`}
            ref={containerRef}
            className={`${prefix}--cardarray__col ${prefix}--cardarray-group ${prefix}--grid--condensed`}>
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
  contentArray.map(elem => (
    <CardArrayItem title={elem.title} copy={elem.copy} href={elem.href} />
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
