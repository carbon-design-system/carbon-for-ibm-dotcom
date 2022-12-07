/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CTALogic from './CTALogic';
import { FeatureCard } from '../FeatureCard';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * FeatureCard subcomponent for CTA.
 */
const FeatureCTA = ({
  size,
  type,
  openLightBox,
  renderLightBox,
  videoTitle,
  formatCTAcopy,
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
        <FeatureCard
          card={_renderFeatureCard({
            card: {
              ...otherProps.card,
              heading: formatCTAcopy({
                title: videoTitle[0].title,
                duration: videoTitle[0].duration,
              }),
            },
          })}
          size={size}
          onClick={(e) => CTALogic.setLightBox(e, openLightBox)}
        />
      )}
    </div>
  ) : (
    <FeatureCard
      card={_renderFeatureCard({
        card: {
          ...otherProps.card,
        },
      })}
      size={size}
    />
  );
};

/**
 * sets featureCard
 *
 * @param {object} param param object
 * @param {object} param.card card object
 * @private
 * @returns {*} object
 */
const _renderFeatureCard = ({ card }) => {
  if (card.type === 'jump') card.cta.type = 'jump';
  else if (card.type === 'video') card.cta.href = '#';
  card.cta = {
    ...card.cta,
    icon: { src: CTALogic.iconSelector(card.cta.type) },
  };
  card.type = 'link';
  return card;
};

FeatureCTA.propTypes = {
  /**
   * Size of Feature Card. Choose from:
   *
   * | Name    | Description                                                  |
   * | ------- | -------------------------------------------------------------|
   * | `medium`| Default Feature Card variant                                 |
   * | `large` | Large Feature Card variant that contains eyebrow and heading |
   */
  size: PropTypes.oneOf(['medium', 'large']),

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
   * | `default`  | None             | Describes the default CTA - without icon                         |
   *
   * For more details of icons, refer to:
   *
   * - [Icons library](https://www.carbondesignsystem.com/guidelines/icons/library/)!👀
   * - [@carbon/icons-react](https://github.com/carbon-design-system/carbon/tree/main/packages/icons-react)!👀
   * - [carbon-icons](https://www.npmjs.com/package/carbon-icons)!👀
   */
  type: PropTypes.oneOfType([
    PropTypes.oneOf([
      'jump',
      'local',
      'external',
      'download',
      'video',
      'default',
    ]),
    PropTypes.arrayOf(
      PropTypes.oneOf([
        'jump',
        'local',
        'external',
        'download',
        'video',
        'default',
      ])
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
      duration: PropTypes.string,
      key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ),

  /**
   * Func to format the cta copy
   */
  formatCTAcopy: PropTypes.func,
};

FeatureCTA.defaultProps = {
  type: 'default',
  formatCTAcopy: ({ title, duration }) => `${title} ${duration}`,
};

export default FeatureCTA;
