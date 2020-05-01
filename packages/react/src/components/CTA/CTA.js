/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect, useCallback } from 'react';
import ButtonCTA from './ButtonCTA';
import CardCTA from './CardCTA';
import CTALogic from './CTALogic';
import FeatureCTA from './FeatureCTA';
import { LightboxMediaViewer } from '../LightboxMediaViewer';
import PropTypes from 'prop-types';
import TextCTA from './TextCTA';
import { VideoPlayerAPI } from '@carbon/ibmdotcom-services';

/**
 * CTA component
 *
 * @param {object} props props object
 * @param {string} props.style cta style ( text | card | button | feature ).
 * @param {string} props.type cta type ( jump | local | external ).
 * @param {string} props.customClassName custom classname from parent
 * @returns {*} CTA component
 */
const CTA = ({ style, type, customClassName, ...otherProps }) => {
  const [renderLightBox, openLightBox] = useState(false);
  const [videoTitle, setVideoTitle] = useState([{ title: '', key: 0 }]);
  const [mediaData, setMediaData] = useState({});

  useEffect(() => {
    getVideoData();
  }, [getVideoData, style, type]);

  /**
   * retrieve duration and title information from the video if
   * the type of the CTA is `video`
   *
   * sets the `videoTitle` state with an array of title objects
   *
   */
  const getVideoData = useCallback(async () => {
    if (type === 'video' || type.includes('video')) {
      const videoId = CTALogic.getVideoId(style, otherProps);
      const title = await Promise.all(
        videoId.map(async vidId => {
          const video = await VideoPlayerAPI.api(vidId.src);
          const time = VideoPlayerAPI.getVideoDuration(video.msDuration);
          return {
            title: `${video.name} ${time}`,
            key: vidId.key,
          };
        })
      );
      setVideoTitle(title);
    }
  }, [otherProps, style, type]);

  return (
    <div className={customClassName}>
      {renderCTA({
        style,
        type,
        renderLightBox,
        openLightBox,
        videoTitle,
        mediaData,
        setMediaData,
        ...otherProps,
      })}
    </div>
  );
};

/**
 * renders CTA component
 *
 * @param {object} props props object
 * @param {string} props.style cta style ( text | card | button | feature ).
 * @param {string} props.type cta type ( jump | local | external ).
 * @returns {*} CTA Component
 */
const renderCTA = ({ style, ...otherProps }) => {
  const ctaProps = {
    iconSelector: CTALogic._iconSelector,
    external: CTALogic._external,
    jump: CTALogic._jump,
    style: style,
    setLightBox: setLightBox,
    launchLightBox: launchLightBox,
    ...otherProps,
  };

  switch (style) {
    case 'card':
      return <CardCTA {...ctaProps} />;
    case 'button': {
      return <ButtonCTA {...ctaProps} />;
    }
    case 'feature':
      return <FeatureCTA {...ctaProps} />;
    default: {
      return <TextCTA {...ctaProps} />;
    }
  }
};

/**
 * Opens the LightBoxMediaViewer component when CTA is clicked
 *
 * @param {boolean} renderLightBox determine whether to render the lightbox
 * @param {Function} openLightBox func to toggle the lightbox
 * @param {object} media media object to render within the lightbox
 * @private
 * @returns {*} lightbox component
 */
const launchLightBox = (renderLightBox, openLightBox, media) => {
  return (
    renderLightBox && (
      <LightboxMediaViewer
        media={media}
        open={true}
        onClose={() => openLightBox(false)}
      />
    )
  );
};

/**
 *
 * @param {*} e event
 * @param {Function} openLightBox function to toggle lightbox
 *
 * @returns {*} set lightbox state
 */
const setLightBox = (e, openLightBox) => {
  e.preventDefault();
  return openLightBox(true);
};

CTA.propTypes = {
  style: PropTypes.string,
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  customClassName: PropTypes.string,
};

export default CTA;
