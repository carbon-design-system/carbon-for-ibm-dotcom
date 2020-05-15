/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef } from 'react';
import { ArrowRight20 } from '@carbon/icons-react';
import { Card } from '../../sub-patterns/Card';
import { ContentGroup } from '../../sub-patterns/ContentGroup';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import { sameHeight } from '@carbon/ibmdotcom-utilities';
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
const ContentGroupCards = ({ heading, items }) => {
  const containerRef = useRef();

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
          containerNode.getElementsByClassName(`${prefix}--card__heading`),
          'md'
        );
        sameHeight(
          containerNode.getElementsByClassName(`${prefix}--card__copy`),
          'md'
        );
      }
    });
  };

  return (
    <section
      data-autoid={`${stablePrefix}--content-group-cards`}
      className={`${prefix}--content-group-cards`}>
      <ContentGroup heading={heading}>
        <div
          data-autoid={`${stablePrefix}--content-group-cards-group`}
          ref={containerRef}
          className={`${prefix}--content-group-cards-group ${prefix}--grid--condensed`}>
          <div className={`${prefix}--content-group-cards__row`}>
            {_renderCards(items)}
          </div>
        </div>
      </ContentGroup>
    </section>
  );
};

/**
 * Renders the cards based on the ContentArray entries
 *
 * @param {Array} items Content object array
 * @returns {*} CardArrayItem JSX objects
 */
const _renderCards = items =>
  items.map((elem, index) => (
    <div
      data-autoid={`${stablePrefix}--content-group-cards-item`}
      className={`${prefix}--content-group-cards-item__col`}
      key={index}
      role="region">
      <Card
        customClassName={`${prefix}--content-group-cards-item`}
        heading={elem.heading}
        copy={elem.copy}
        cta={{
          href: elem.cta.href,
          icon: {
            src: ArrowRight20,
          },
        }}
        type="link"
        aria-label={elem.heading}
      />
    </div>
  ));

ContentGroupCards.propTypes = {
  heading: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      copy: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

export default ContentGroupCards;
