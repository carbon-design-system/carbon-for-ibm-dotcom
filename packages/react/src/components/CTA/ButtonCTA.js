/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import { ButtonGroup } from '../../patterns/sub-patterns/ButtonGroup';
import CTALogic from './CTALogic';
import PropTypes from 'prop-types';

/**
 * Button subcomponent for CTA
 *
 * @param {object} param param object
 * @param {Array} param.type CTA type
 * @param {Function} param.openLightBox func to set renderLightBox state
 * @param {boolean} param.renderLightBox bool to determine whether to open lightbox
 * @param {Array} param.videoTitle array of video titles
 *
 * @returns {object} JSX object
 */
const ButtonCTA = ({
  type,
  openLightBox,
  renderLightBox,
  videoTitle,
  ...otherProps
}) => {
  const [mediaData, setMediaData] = useState({});

  return type.includes('video') ? (
    <div>
      {CTALogic.launchLightBox(renderLightBox, openLightBox, mediaData)}
      {!renderLightBox && (
        <ButtonGroup
          buttons={_renderButtons({
            videoTitle,
            openLightBox,
            setMediaData,
            ...otherProps,
          })}
        />
      )}
    </div>
  ) : (
    <ButtonGroup buttons={_renderButtons({ ...otherProps })} />
  );
};

/**
 * sets button
 *
 * @param {object} param param object
 * @param {Function} param.openLightBox func to set renderLightBox state
 * @param {Array} param.videoTitle array of video titles
 * @param {Function} param.setMediaData func to set media data state
 * @param {object} param.buttons object with buttons array
 * @private
 * @returns {*} object
 */
const _renderButtons = ({
  openLightBox,
  videoTitle,
  setMediaData,
  buttons,
}) => {
  return buttons.map((button, key) => {
    if (button.type === 'video') {
      button.onClick = e => {
        e.preventDefault();
        setMediaData(button.media);
        return CTALogic.setLightBox(e, openLightBox);
      };
      let title = videoTitle.filter(name => {
        return name.key === key;
      });
      button.copy = !title[0] ? button.copy : title[0].title;
      button.href = '#';
    } else {
      button.onClick = e => CTALogic.jump(e, button.type);
      button.target = CTALogic.external(button.type);
    }
    button.renderIcon = CTALogic.iconSelector(button.type);
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
  type: PropTypes.array,
  openLightBox: PropTypes.func,
  renderLightBox: PropTypes.bool,
  videoTitle: PropTypes.array,
  mediaData: PropTypes.object,
  setMediaData: PropTypes.func,
};

export default ButtonCTA;
