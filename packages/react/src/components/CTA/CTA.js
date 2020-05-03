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

  const CTAComponent =
    style === 'card'
      ? CardCTA
      : style === 'button'
      ? ButtonCTA
      : style === 'feature'
      ? FeatureCTA
      : TextCTA;

  const ctaProps = {
    style,
    type,
    renderLightBox,
    openLightBox,
    videoTitle,
    mediaData,
    setMediaData,
    ...otherProps,
  };

  return (
    <div className={customClassName}>
      <CTAComponent {...ctaProps} />
    </div>
  );
};

CTA.propTypes = {
  style: PropTypes.string,
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  customClassName: PropTypes.string,
};

export default CTA;
