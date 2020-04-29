/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ButtonGroup } from '../../patterns/sub-patterns/ButtonGroup';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Button subcomponent for CTA
 *
 * @param {object} param param object
 * @param {Function} param.iconSelector func to set icon type
 * @param {Function} param.external func to determine if link opens in new tab
 * @param {Function} param.jump func to set smooth scroll functionality
 * @param {Array} param.type CTA type
 * @param {Function} param.openLightBox func to set renderLightBox state
 * @param {Function} param.setLightBox func to open the lightbox
 * @param {boolean} param.renderLightBox bool to determine whether to open lightbox
 * @param {Function} param.launchLightBox func to render lightbox
 * @param {Array} param.videoTitle array of video titles
 * @param {Function} param.setMediaData func to set media data state
 * @param {object} param.mediaData media data object to render within lightbox
 *
 * @returns {object} JSX object
 */
const ButtonCTA = ({
  iconSelector,
  external,
  jump,
  type,
  openLightBox,
  setLightBox,
  renderLightBox,
  launchLightBox,
  videoTitle,
  mediaData,
  setMediaData,
  ...otherProps
}) => {
  return type.includes('video') ? (
    <div>
      {launchLightBox(renderLightBox, openLightBox, mediaData)}
      {!renderLightBox && (
        <ButtonGroup
          buttons={_renderButtons({
            videoTitle,
            external,
            jump,
            iconSelector,
            openLightBox,
            setLightBox,
            setMediaData,
            ...otherProps,
          })}
        />
      )}
    </div>
  ) : (
    <ButtonGroup
      buttons={_renderButtons({ external, jump, iconSelector, ...otherProps })}
    />
  );
};

/**
 * sets button
 *
 * @param {object} param param object
 * @param {Function} param.external func to determine if link opens in new tab
 * @param {Function} param.jump func to set smooth scroll functionality
 * @param {Function} param.iconSelector func to set icon type
 * @param {Function} param.openLightBox func to set renderLightBox state
 * @param {Function} param.setLightBox func to open the lightbox
 * @param {Array} param.videoTitle array of video titles
 * @param {Function} param.setMediaData func to set media data state
 * @param {object} param.buttons object with buttons array
 * @private
 * @returns {*} object
 */
const _renderButtons = ({
  external,
  jump,
  iconSelector,
  openLightBox,
  setLightBox,
  videoTitle,
  setMediaData,
  buttons,
}) => {
  return buttons.map((button, key) => {
    if (button.type === 'video') {
      button.onClick = e => {
        e.preventDefault();
        setMediaData(button.media);
        return setLightBox(e, openLightBox);
      };
      let title = videoTitle.filter(name => {
        return name.key === key;
      });
      button.copy = !title[0] ? button.copy : title[0].title;
      button.href = '#';
    } else {
      button.onClick = e => jump(e, button.type);
      button.target = external(button.type);
    }
    button.renderIcon = iconSelector(button.type);
    button.iconDescription = _renderIconDesc(button.type);
    return button;
  });
};

/**
 * render the icon description for screen reader
 *
 * @param {string} type type of cta
 *
 * @private
 * @returns {string} icon description
 */
const _renderIconDesc = type => {
  switch (type) {
    case 'external':
      return 'external launch icon';
    case 'jump':
      return 'down arrow icon';
    case 'video':
      return 'play button icon';
    default:
      return 'right arrow icon';
  }
};

ButtonCTA.propTypes = {
  iconSelector: PropTypes.func,
  external: PropTypes.func,
  jump: PropTypes.func,
  type: PropTypes.array,
  openLightBox: PropTypes.func,
  setLightBox: PropTypes.func,
  renderLightBox: PropTypes.bool,
  launchLightBox: PropTypes.func,
  videoTitle: PropTypes.array,
  mediaData: PropTypes.object,
  setMediaData: PropTypes.func,
};

export default ButtonCTA;
