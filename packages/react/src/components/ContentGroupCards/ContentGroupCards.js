/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef } from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import { Card } from '../Card';
import ContentGroup from '../../internal/components/ContentGroup/ContentGroup';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import sameHeight from '@carbon/ibmdotcom-utilities/es/utilities/sameHeight/sameHeight';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;
const { stablePrefix } = ddsSettings;
/**
 * Card Array Component.
 */
const ContentGroupCards = ({ heading, items, copy }) => {
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
      <ContentGroup heading={heading} copy={copy}>
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
        aria-label={elem.heading}
      />
    </div>
  ));

ContentGroupCards.propTypes = {
  /**
   * Main heading of the pattern.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Copy text (enabled for the `markdownToHtml` utility)
   */
  copy: PropTypes.string,

  /**
   * Array of content group objects. Has the following structure:
   *
   * | Name      | Data Type | Description                                                |
   * | --------- | --------- | ---------------------------------------------------------- |
   * | `heading` | String    | Title for the Card.                                        |
   * | `copy`    | String    | Copy for the Card.                                         |
   * | `cta`     | Object    | Object containing target and href of cta. See `cta` below. |
   *
   * `cta`:
   *
   * | Name   | Data Type | Description                       |
   * | ------ | --------- | --------------------------------- |
   * | `href` | String    | Url of the Content Card item cta. |
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      copy: PropTypes.string,
      cta: PropTypes.shape({
        href: PropTypes.string,
      }),
    })
  ),
};

export default ContentGroupCards;
