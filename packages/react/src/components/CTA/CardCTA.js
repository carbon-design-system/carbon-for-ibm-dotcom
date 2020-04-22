/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card } from '../../patterns/sub-patterns/Card';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

/**
 * Card subcomponent for CTA
 *
 * @param {object} param param object
 * @param {Function} param.iconSelector func to set icon type
 * @param {Function} param.external func to determine if link opens in new tab
 * @param {Function} param.jump func to set smooth scroll functionality
 * @param {string} param.type CTA type
 * @param {Function} param.openLightBox func to set renderLightBox state
 * @param {Function} param.setLightBox func to open the lightbox
 * @param {boolean} param.renderLightBox bool to determine whether to open lightbox
 * @param {Function} param.launchLightBox func to render lightbox
 * @param {Array} param.videoTitle array of video titles
 *
 * @returns {object} JSX object
 */
const CardCTA = ({
  iconSelector,
  external,
  jump,
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
      {launchLightBox(renderLightBox, openLightBox, otherProps.media)}
      {!renderLightBox && (
        <Card
          customClassName={`${prefix}--card__CTA`}
          cta={{
            href: '#',
            icon: {
              src: iconSelector(type),
            },
          }}
          copy={videoTitle[0].title}
          type="link"
          handleClick={e => setLightBox(e, openLightBox)}
        />
      )}
    </div>
  ) : (
    <Card
      customClassName={`${prefix}--card__CTA`}
      cta={{
        href: otherProps.cta.href,
        icon: {
          src: iconSelector(type),
        },
      }}
      copy={otherProps.copy}
      type="link"
      target={external(type)}
      handleClick={e => jump(e, type)}
      role="region"
    />
  );
};

CardCTA.propTypes = {
  iconSelector: PropTypes.func,
  external: PropTypes.func,
  jump: PropTypes.func,
  type: PropTypes.string,
  openLightBox: PropTypes.func,
  setLightBox: PropTypes.func,
  renderLightBox: PropTypes.bool,
  launchLightBox: PropTypes.func,
  videoTitle: PropTypes.array,
};

export default CardCTA;
