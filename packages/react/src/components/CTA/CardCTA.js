/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card } from '../../patterns/sub-patterns/Card';
import CTALogic from './CTALogic';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * Card subcomponent for CTA
 *
 * @param {object} param param object
 * @param {string} param.type CTA type
 * @param {Function} param.openLightBox func to set renderLightBox state
 * @param {boolean} param.renderLightBox bool to determine whether to open lightbox
 * @param {Array} param.videoTitle array of video titles
 *
 * @returns {object} JSX object
 */
const CardCTA = ({
  type,
  openLightBox,
  renderLightBox,
  videoTitle,
  ...otherProps
}) => {
  return type === 'video' ? (
    <div>
      {CTALogic.launchLightBox(renderLightBox, openLightBox, otherProps.media)}
      {!renderLightBox && (
        <Card
          customClassName={`${prefix}--card__CTA`}
          cta={{
            href: '#',
            icon: {
              src: CTALogic.iconSelector(type),
            },
          }}
          copy={videoTitle[0].title}
          type="link"
          handleClick={e => CTALogic.setLightBox(e, openLightBox)}
        />
      )}
    </div>
  ) : (
    <Card
      customClassName={`${prefix}--card__CTA`}
      cta={{
        href: otherProps.cta.href,
        icon: {
          src: CTALogic.iconSelector(type),
        },
      }}
      copy={otherProps.copy}
      type="link"
      target={CTALogic.external(type)}
      handleClick={e => CTALogic.jump(e, type)}
      role="region"
    />
  );
};

CardCTA.propTypes = {
  type: PropTypes.string,
  openLightBox: PropTypes.func,
  renderLightBox: PropTypes.bool,
  videoTitle: PropTypes.array,
};

export default CardCTA;
