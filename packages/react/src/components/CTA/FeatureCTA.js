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
 * FeatureCard subcomponent for CTA
 *
 * @param {object} param param object
 * @param {string} param.type CTA type
 * @param {Function} param.openLightBox func to set renderLightBox state
 * @param {boolean} param.renderLightBox bool to determine whether to open lightbox
 * @param {Array} param.videoTitle array of video titles
 *
 * @returns {object} JSX object
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
  if (card.type === 'video') card.cta.href = '#';
  card.cta.icon.src = CTALogic.iconSelector(card.type);
  card.target = CTALogic.external(card.type);
  card.type = 'link';
  return card;
};

FeatureCTA.propTypes = {
  type: PropTypes.string,
  openLightBox: PropTypes.func,
  setLightBox: PropTypes.func,
  renderLightBox: PropTypes.bool,
  launchLightBox: PropTypes.func,
  videoTitle: PropTypes.array,
};

export default FeatureCTA;
