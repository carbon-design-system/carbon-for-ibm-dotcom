/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { FeatureCard } from '../../patterns/blocks/FeatureCard';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * FeatureCard subcomponent for CTA
 *
 * @param {object} param param object
 * @param {string} param.type CTA type
 * @param {Function} param.openLightBox func to set renderLightBox state
 * @param {Function} param.setLightBox func to open the lightbox
 * @param {boolean} param.renderLightBox bool to determine whether to open lightbox
 * @param {Function} param.launchLightBox func to render lightbox
 * @param {Array} param.videoTitle array of video titles
 * @param {Function} param.iconSelector func to set icon type
 * @param {Function} param.jump func to set smooth scroll functionality
 * @param {Function} param.external func to determine if link opens in new tab
 *
 * @returns {object} JSX object
 */
const FeatureCTA = ({
  type,
  openLightBox,
  setLightBox,
  renderLightBox,
  launchLightBox,
  videoTitle,
  iconSelector,
  jump,
  external,
  ...otherProps
}) => {
  return type === 'video' ? (
    <div>
      {launchLightBox(renderLightBox, openLightBox, otherProps.card.cta.media)}
      {!renderLightBox && (
        <FeatureCard
          heading={otherProps.heading}
          card={_renderFeatureCard({
            card: {
              ...otherProps.card,
              heading: videoTitle[0].title,
            },
            iconSelector,
            jump,
            external,
          })}
          onClick={e => setLightBox(e, openLightBox)}
        />
      )}
    </div>
  ) : (
    <FeatureCard
      heading={otherProps.heading}
      card={_renderFeatureCard({
        card: otherProps.card,
        iconSelector,
        jump,
        external,
      })}
    />
  );
};

/**
 * sets featureCard
 *
 * @param {object} param param object
 * @param {object} param.card card object
 * @param {Function} param.iconSelector func to set icon type
 * @param {Function} param.jump func to set smooth scroll functionality
 * @param {Function} param.external func to determine if link opens in new tab
 *
 * @private
 * @returns {*} object
 */
const _renderFeatureCard = ({ card, iconSelector, jump, external }) => {
  if (card.type === 'video') card.cta.href = '#';
  card.cta.icon.src = iconSelector(card.type);
  card.handleClick = e => jump(e, card.type);
  card.target = external(card.type);
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
  iconSelector: PropTypes.func,
  jump: PropTypes.func,
  external: PropTypes.func,
};

export default FeatureCTA;
