/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CTALogic from './CTALogic';
import { FeatureCardBlockMedium } from '../../patterns/blocks/FeatureCardBlockMedium';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * FeatureCard subcomponent for CTA.
 */
const FeatureCTA = ({
  type,
  openLightBox,
  renderLightBox,
  videoTitle,
  ...otherProps
}) => {
  return type === 'video' ? (
    <div>
      {CTALogic.launchLightBox(
        renderLightBox,
        openLightBox,
        otherProps.card.cta.media
      )}
      {!renderLightBox && (
        <FeatureCardBlockMedium
          heading={otherProps.heading}
          card={_renderFeatureCard({
            card: {
              ...otherProps.card,
              heading: videoTitle[0].title,
            },
          })}
          onClick={e => CTALogic.setLightBox(e, openLightBox)}
        />
      )}
    </div>
  ) : (
    <FeatureCardBlockMedium
      heading={otherProps.heading}
      card={_renderFeatureCard({
        card: {
          ...otherProps.card,
        },
      })}
    />
  );
};

/**
 * sets featureCard
 *
 * @param {object} param param object
 * @param {object} param.card card object
 *
 * @private
 * @returns {*} object
 */
const _renderFeatureCard = ({ card }) => {
  if (card.type === 'jump') card.cta.type = 'jump';
  else if (card.type === 'video') card.cta.href = '#';
  card.cta.icon.src = CTALogic.iconSelector(card.type);
  card.target = CTALogic.external(card.type);
  card.type = 'link';
  return card;
};

FeatureCTA.propTypes = {
  /**
   * CTA type. Choose from:
   *
   * | Type       | SVG element Name | Description                                                      |
   * | ---------- | ---------------- | ---------------------------------------------------------------- |
   * | `local`    | ArrowRight20     | Describes right arrow onClick which loads in self page.          |
   * | `jump`     | ArrowDown20      | Describes down arrow onClick which scrollToView of target.       |
   * | `external` | Launch20         | Describes launch arrow onClick which loads in new tab.           |
   * | `download` | Download20       | Describes download arrow onClick for downloading files.          |
   * | `video`    | PlayOutline20    | Describes play icon onClick which loads the video in a lightbox. |
   *
   * For more details of icons, refer to:
   *
   * - [Icons library](https://www.carbondesignsystem.com/guidelines/icons/library/)!👀
   * - [@carbon/icons-react](https://github.com/carbon-design-system/carbon/tree/master/packages/icons-react)!👀
   * - [carbon-icons](https://www.npmjs.com/package/carbon-icons)!👀
   */
  type: PropTypes.oneOfType([
    PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']),
    PropTypes.arrayOf(
      PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video'])
    ),
  ]),

  /**
   * Func to set renderLightBox state.
   */
  openLightBox: PropTypes.func,

  /**
   * Bool to determine whether to open lightbox.
   */
  renderLightBox: PropTypes.bool,

  /**
   * Array of video titles.
   */
  videoTitle: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ),
};

export default FeatureCTA;
