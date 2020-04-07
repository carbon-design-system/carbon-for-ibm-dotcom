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
 * Card subcomponent for CTA
 *
 * @param {object} params param object
 * @param {object} params.otherProps other props
 * @param {string} params.target target type
 * @param {Element} params.icon icon element
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
  videoTitle,
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
      {launchLightBox(renderLightBox, openLightBox, otherProps.media)}
      {!renderLightBox && (
        <LinkWithIcon href="#" onClick={e => setLightBox(e, openLightBox)}>
          {videoTitle}
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
  videoTitle: PropTypes.string,
};

export default TextCTA;
