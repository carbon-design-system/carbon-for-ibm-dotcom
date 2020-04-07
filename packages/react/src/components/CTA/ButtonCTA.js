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
 * Card subcomponent for CTA
 *
 * @param {object} params param object
 * @param {object} params.otherProps other props
 * @param {string} params.target target type
 * @param {Element} params.icon icon element
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
 * @param {object} param.buttons object with buttons array
 * @param {Array} param.videoTitle array of video titles
 * @param {Function} param.openLightBox func to set renderLightBox state
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
    return button;
  });
};

ButtonCTA.propTypes = {
  target: PropTypes.string,
  icon: PropTypes.string,
  iconSelector: PropTypes.func,
  external: PropTypes.func,
  jump: PropTypes.func,
  type: PropTypes.string,
  openLightBox: PropTypes.func,
  setLightBox: PropTypes.func,
  renderLightBox: PropTypes.bool,
  launchLightBox: PropTypes.func,
  videoTitle: PropTypes.array,
  mediaData: PropTypes.object,
  setMediaData: PropTypes.func,
};

export default ButtonCTA;
