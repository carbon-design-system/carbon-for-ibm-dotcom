/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState, useEffect, useCallback } from 'react';
import KalturaPlayerAPI from '@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer';

/**
 * utilizes the KalturaPlayerAPI to extract video data and
 * returns video title with duration for CTA
 *
 * @param {string} type type of CTA
 * @param {Array} videoId array of video ids
 * @param {string} customVideoTitle if provided, overrides the video original title
 * @returns {*} JSX Object
 */
function useVideoData(type, videoId, customVideoTitle) {
  const [videoTitle, setVideoTitle] = useState([
    { title: '', duration: '', key: 0 },
  ]);

  let getVideoData;

  useEffect(() => {
    getVideoData();
  }, [getVideoData, type, customVideoTitle]);
  /**
   * retrieve duration and title information from the video if
   * the type of the CTA is `video`
   *
   * sets the `videoTitle` state with an array of title objects
   *
   */
  getVideoData = useCallback(async () => {
    if (type === 'video' || type.includes('video')) {
      const title = await Promise.all(
        videoId.map(async (vidId) => {
          const video = await KalturaPlayerAPI.api(vidId.src);
          const time = KalturaPlayerAPI.getMediaDuration(
            video.msDuration,
            true
          );
          return {
            title: customVideoTitle ? customVideoTitle : video.name,
            duration: time,
            key: vidId.key,
          };
        })
      );
      setVideoTitle(title);
    }
  }, [type, videoId, customVideoTitle]);

  return videoTitle;
}

export default useVideoData;
