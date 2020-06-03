/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState, useEffect, useCallback } from 'react';
import { VideoPlayerAPI } from '@carbon/ibmdotcom-services';

/**
 * utilizes the videoplayerAPI to extract video data and
 * returns video title with duration for CTA
 *
 * @param {string} type type of CTA
 * @param {Array} videoId array of video ids
 * @returns {*} JSX Object
 */
function useVideoData(type, videoId) {
  const [videoTitle, setVideoTitle] = useState([
    { title: '', duration: '', key: 0 },
  ]);

  /**
   * retrieve duration and title information from the video if
   * the type of the CTA is `video`
   *
   * sets the `videoTitle` state with an array of title objects
   *
   */
  const getVideoData = useCallback(async () => {
    if (type === 'video' || type.includes('video')) {
      const title = await Promise.all(
        videoId.map(async vidId => {
          const video = await VideoPlayerAPI.api(vidId.src);
          const time = VideoPlayerAPI.getVideoDuration(video.msDuration);
          return {
            title: video.name,
            duration: time,
            key: vidId.key,
          };
        })
      );
      setVideoTitle(title);
    }
  }, [type, videoId]);

  useEffect(() => {
    getVideoData();
  }, [getVideoData, type]);

  return videoTitle;
}

export default useVideoData;
