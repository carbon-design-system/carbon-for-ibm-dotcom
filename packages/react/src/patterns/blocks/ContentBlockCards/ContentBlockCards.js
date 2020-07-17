/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CardGroup } from '../../../components/CardGroup';
import ContentBlock from '../../../internal/components/ContentBlock/ContentBlock';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content Block - Cards pattern.
 */
const ContentBlockCards = ({ heading, cards, cta }) => (
  <div
    data-autoid={`${stablePrefix}--content-block-cards`}
    className={`${prefix}--content-block-cards`}>
    <ContentBlock heading={heading} cta={cta}>
      <div className={`${prefix}--content-block-cards__content`}>
        <CardGroup cards={cards} />
      </div>
    </ContentBlock>
  </div>
);

ContentBlockCards.propTypes = {
  /**
   * Main title of ContentBlockCards pattern.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Array of card objects.
   * Uses a sub-scheme of `<Card>`'s props for each items, like below, depending on what type of card is used:
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
   * See [`<CardGroup>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cardgroup--default#props) for full usage details.
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
    })
  ).isRequired,

  /**
   * CTA used at the end of content body. `Card` style supported.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    style: PropTypes.oneOf(['card']),
    type: PropTypes.oneOfType([
      PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']),
      PropTypes.arrayOf(
        PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video'])
      ),
    ]),
    copy: PropTypes.string,
    customClassName: PropTypes.string,
  }),
};

export default ContentBlockCards;
