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
 * Card subcomponent for CTA
 *
 * @param {object} params param object
 * @param {object} params.otherProps other props
 * @param {string} params.target target type
 * @param {Element} params.icon icon element
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
  ...otherProps
}) => {
  return type === 'video' ? (
    <div>
      {launchLightBox(renderLightBox, openLightBox, otherProps.card.cta.media)}
      {!renderLightBox && (
        <FeatureCard
          heading={otherProps.heading}
          card={_renderFeatureCard({
            ...otherProps,
            heading: videoTitle[0].title,
          })}
          onClick={e => setLightBox(e, openLightBox)}
        />
      )}
    </div>
  ) : (
    <FeatureCard
      heading={otherProps.heading}
      card={_renderFeatureCard({ ...otherProps })}
    />
  );
};

/**
 * sets featureCard
 *
 * @param {object} featureCard object with card object
 * @private
 * @returns {*} object
 */
const _renderFeatureCard = ({ card, iconSelector, jump, external }) => {
  if (card.type === 'video') card.cta.href = '#';
  card.icon = iconSelector(card.type);
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
};

export default FeatureCTA;
