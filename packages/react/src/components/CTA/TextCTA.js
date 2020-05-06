/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CTALogic from './CTALogic';
import { LinkWithIcon } from '../LinkWithIcon';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Link subcomponent for CTA
 *
 * @param {object} param param object
 * @param {string} param.type CTA type
 * @param {Function} param.openLightBox func to set renderLightBox state
 * @param {boolean} param.renderLightBox bool to determine whether to open lightbox
 * @param {Array} param.videoTitle array of video titles
 *
 * @returns {object} JSX object
 */
const TextCTA = ({
  type,
  openLightBox,
  renderLightBox,
  videoTitle,
  ...otherProps
}) => {
  const Icon = CTALogic.iconSelector(type);
  const href =
    type !== 'video'
      ? otherProps.href
        ? otherProps.href
        : otherProps.cta.href
      : null;
  return type === 'video' ? (
    <div>
      {CTALogic.launchLightBox(renderLightBox, openLightBox, otherProps.media)}
      {!renderLightBox && (
        <LinkWithIcon
          href="#"
          onClick={e => CTALogic.setLightBox(e, openLightBox)}>
          {videoTitle[0].title}
          <Icon />
        </LinkWithIcon>
      )}
    </div>
  ) : (
    <LinkWithIcon
      href={href}
      target={CTALogic.external(type)}
      onClick={e => CTALogic.jump(e, type)}>
      {otherProps.copy}
      <Icon />
    </LinkWithIcon>
  );
};

TextCTA.propTypes = {
  type: PropTypes.string,
  openLightBox: PropTypes.func,
  renderLightBox: PropTypes.bool,
  videoTitle: PropTypes.array,
};

export default TextCTA;
