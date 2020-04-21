/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LinkWithIcon } from '../LinkWithIcon';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Link subcomponent for CTA
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
 * @param {Array} param.videoData array of videoData objects
 *
 * @returns {object} JSX object
 */
const TextCTA = ({
  iconSelector,
  external,
  jump,
  type,
  openLightBox,
  setLightBox,
  renderLightBox,
  launchLightBox,
  videoData,
  ...otherProps
}) => {
  const Icon = iconSelector(type);
  const href =
    type !== 'video'
      ? otherProps.href
        ? otherProps.href
        : otherProps.cta.href
      : null;
  return type === 'video' ? (
    <div>
      {launchLightBox(renderLightBox, openLightBox, {
        ...otherProps.media,
        ...videoData[0],
      })}
      {!renderLightBox && (
        <LinkWithIcon href="#" onClick={e => setLightBox(e, openLightBox)}>
          {videoData[0].ctaText}
          <Icon />
        </LinkWithIcon>
      )}
    </div>
  ) : (
    <LinkWithIcon
      href={href}
      target={external(type)}
      onClick={e => jump(e, type)}>
      {otherProps.copy}
      <Icon />
    </LinkWithIcon>
  );
};

TextCTA.propTypes = {
  iconSelector: PropTypes.func,
  external: PropTypes.func,
  jump: PropTypes.func,
  type: PropTypes.string,
  openLightBox: PropTypes.func,
  setLightBox: PropTypes.func,
  renderLightBox: PropTypes.bool,
  launchLightBox: PropTypes.func,
  videoData: PropTypes.array,
};

export default TextCTA;
