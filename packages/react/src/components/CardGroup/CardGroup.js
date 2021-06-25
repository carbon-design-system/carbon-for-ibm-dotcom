/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { baseFontSize, breakpoints } from '@carbon/layout';
import React, { useRef, useCallback, useEffect } from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import { Card } from '../Card';
import { CTA } from '../CTA';
import cx from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import sameHeight from '@carbon/ibmdotcom-utilities/es/utilities/sameHeight/sameHeight';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

const gridBreakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;

/**
 * CardGroup component
 */
const CardGroup = ({ cards, cardsPerRow, cta, border }) => {
  const containerRef = useRef();

  /**
   * Resize observer to trigger same height function.
   *
   * @private
   */
  const resizeObserver = useRef(null);

  useEffect(() => {
    resizeObserver.current = new ResizeObserver(setSameHeight);
    resizeObserver.current.observe(document.documentElement);
    return () => (resizeObserver.current = null);
  }, [setSameHeight]);

  /**
   * Function that activates the sameHeight utility
   */
  const setSameHeight = useCallback(entries => {
    window.requestAnimationFrame(() => {
      const documentWidth = entries[0].contentRect.width;
      const columns = documentWidth < gridBreakpoint ? 2 : 3;
      const { current: containerNode } = containerRef;
      if (containerNode) {
        // split arrays into chunks to handle height setting in each row separately
        const splitItemEyebrows = splitArrayPerRows(
          containerNode.getElementsByClassName(`${prefix}--card__eyebrow`),
          columns
        );
        const splitItemHeadings = splitArrayPerRows(
          containerNode.getElementsByClassName(`${prefix}--card__heading`),
          columns
        );
        const splitItemCopies = splitArrayPerRows(
          containerNode.getElementsByClassName(`${prefix}--card__copy`),
          columns
        );
        const splitItemFooters = splitArrayPerRows(
          containerNode.getElementsByClassName(`${prefix}--card__footer`),
          columns
        );

        splitItemEyebrows.forEach(row => {
          sameHeight(
            row.filter(e => {
              return e;
            }),
            'md'
          );
        });
        splitItemHeadings.forEach(row => {
          sameHeight(
            row.filter(e => {
              return e;
            }),
            'md'
          );
        });
        splitItemCopies.forEach(row => {
          sameHeight(
            row.filter(e => {
              return e;
            }),
            'md'
          );
        });
        splitItemFooters.forEach(row => {
          sameHeight(
            row.filter(e => {
              return e;
            }),
            'md'
          );
        });
      }
    });
  }, []);

  /**
   * Helper function that splits an array into smaller groups to ensure the sameHeight function
   * handles rows independently from one another.
   *
   * @param {*} array to be partitioned
   * @param {number} columns the amount of currently displayed columns in a row
   */
  const splitArrayPerRows = (array, columns) => {
    return Array.from(array).reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / columns);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);
  };
  return _renderCards(cards, cardsPerRow, containerRef, cta, border);
};

/**
 * Renders the cards based on the CardGroup entries.
 *
 * @param {Array} cards objects array
 * @param {number} cardsPerRow number of cards per column
 * @param {object} containerRef ref of elements
 * @param {object} cta object
 * @param {boolean} border boolean
 * @returns {*} CardGroup JSX objects
 */
const _renderCards = (cards, cardsPerRow, containerRef, cta, border) => (
  <div
    data-autoid={`${stablePrefix}--card-group`}
    className={cx(`${prefix}--card-group__cards__row`, {
      [`${prefix}--card-group--border`]: border,
      [`${prefix}--row--condensed`]: !border,
    })}
    style={{ '--dds--card-group--cards-in-row': cardsPerRow }}
    ref={containerRef}>
    {cards.map((card, index) => {
      return (
        <div key={index} className={`${prefix}--card-group__cards__col`}>
          <CTA
            style="card"
            key={index}
            customClassName={`${prefix}--card-group__card`}
            image={card.image}
            media={card.media}
            heading={card.heading}
            eyebrow={card.eyebrow}
            copy={card.copy}
            pictogram={card.pictogram}
            cta={{
              ...card.cta,
              icon: {
                src: ArrowRight20,
              },
            }}
            type={card.media ? 'video' : card.type ? card.type : 'local'}
          />
        </div>
      );
    })}
    {cta && (
      <div className={`${prefix}--card-group__cards__col`}>
        <Card
          inverse={true}
          heading={cta.heading}
          cta={{
            href: cta.cta.href,
            icon: {
              src: ArrowRight20,
            },
          }}
        />
      </div>
    )}
  </div>
);

CardGroup.propTypes = {
  /**
   * Array of card objects.
   * Uses a sub-scheme of `<CTA style="card">`'s props for each items.
   *
   * Simple:
   *
   * | Name       | Required | Data Type | Description                            |
   * | ---------- | -------- | --------- | -------------------------------------- |
   * | `copy`     | YES      | String    | Copy of the card.                      |
   * | `heading`  | YES      | String    | Heading of the card.                   |
   * | `cta.href` | YES      | String    | URI for internal or external resource. |
   *
   * Image:
   *
   * | Name       | Required | Data Type | Description                              |
   * | ---------- | -------- | --------- | ---------------------------------------- |
   * | `image`    | YES      | Object    | Contains source and alt text properties. |
   * | `eyebrow`  | YES      | String    | Eyebrow of the card.                     |
   * | `heading`  | YES      | String    | Heading of the card.                     |
   * | `cta.href` | YES      | String    | URI for internal or external resource.   |
   *
   * See [`<CTA style="card">`'s README](https://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--card#props) for full usage details.
   */
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      eyebrow: PropTypes.string,
      copy: PropTypes.string,
      image: PropTypes.shape({
        classname: PropTypes.string,
        sources: PropTypes.arrayOf(
          PropTypes.shape({
            src: PropTypes.string,
            breakpoint: PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number,
            ]),
          })
        ),
        media: PropTypes.arrayOf(
          PropTypes.shape({
            src: PropTypes.string,
            type: PropTypes.string,
          })
        ),
        defaultSrc: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        longDescription: PropTypes.string,
      }),
      cta: PropTypes.shape({
        href: PropTypes.string,
      }),
      pictogram: PropTypes.node,
    })
  ).isRequired,

  /**
   * The number of columns per row. Min 2, max 4, default 3. Applies to >=`lg` breakpoint only.
   */
  cardsPerRow: PropTypes.number,

  /**
   * Optional CTA card for group. Always displays as last item.
   * Uses a sub-scheme of `<Card>`'s props.
   * See [`<Card>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-card--static#props) for full usage details.
   */
  cta: PropTypes.shape({
    heading: PropTypes.string,
    cta: PropTypes.shape({
      href: PropTypes.string,
    }),
  }),
};

CardGroup.defaultProps = {
  cardsPerRow: 3,
};

export default CardGroup;
