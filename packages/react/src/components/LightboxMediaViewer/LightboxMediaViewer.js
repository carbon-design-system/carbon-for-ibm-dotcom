/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  settings as ddsSettings,
  markdownToHtml,
} from '@carbon/ibmdotcom-utilities';
import React, { useEffect, useState } from 'react';
import { ExpressiveModal } from '../ExpressiveModal';
import { Image } from '../Image';
import { ModalBody } from '../../internal/vendor/carbon-components-react/components/ComposedModal/ComposedModal';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import { VideoPlayer } from '../VideoPlayer';
import { VideoPlayerAPI } from '@carbon/ibmdotcom-services';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LightboxMediaViewer Component.
 */
const LightboxMediaViewer = ({ media, ...modalProps }) => {
  const [videoData, setVideoData] = useState({
    title: '',
    alt: '',
    description: '',
  });

  useEffect(() => {
    let stale = false;
    (async () => {
      if (media.type === 'video') {
        const data = await VideoPlayerAPI.api(media.src);
        if (!stale) {
          setVideoData({
            title: data.name,
            alt: data.name,
            description: data.description,
          });
        }
      } else {
        setVideoData({
          title: media.title,
          alt: media.alt,
          description: media.description,
        });
      }
    })();
    return () => {
      stale = true;
    };
  }, [media]);

  const videoDesc = markdownToHtml(videoData.description, {
    createParagraphs: false,
    cleanString: true,
  });

  return (
    <section
      data-autoid={`${stablePrefix}--lightbox-media-viewer`}
      className={`${prefix}--lightbox-media-viewer`}>
      <ExpressiveModal fullwidth={true} {...modalProps}>
        <ModalBody>
          <div className={`${prefix}--lightbox-media-viewer__container`}>
            <div className={`${prefix}--lightbox-media-viewer__row`}>
              <div
                className={`${prefix}--lightbox-media-viewer__media ${prefix}--no-gutter`}>
                {media.type === 'video' ? (
                  <VideoPlayer videoId={media.src} autoPlay={true} />
                ) : (
                  <Image defaultSrc={media.src} alt={videoData.alt} />
                )}
              </div>
              <div
                className={`${prefix}--lightbox-media-viewer__media-description ${prefix}--no-gutter`}>
                <div className={`${prefix}--lightbox-media-viewer__content`}>
                  {videoData.title && (
                    <div
                      data-autoid={`${stablePrefix}--lightbox-media-viewer__content__title`}
                      className={`${prefix}--lightbox-media-viewer__content__title`}>
                      {videoData.title}
                    </div>
                  )}
                  {videoData.description && (
                    <div
                      data-autoid={`${stablePrefix}--lightbox-media-viewer__content__desc`}
                      className={`${prefix}--lightbox-media-viewer__content__desc`}>
                      {videoDesc}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ExpressiveModal>
    </section>
  );
};

LightboxMediaViewer.propTypes = {
  /**
   * Object containing media info. The structure is:
   *
   * | Name          | Data Type | Description                                                           |
   * | ------------- | --------- | --------------------------------------------------------------------- |
   * | `type`        | String    | Determines whether to render `image` or `video`                       |
   * | `src`         | String    | Image link or video id                                                |
   * | `alt`         | String    | Alternate text for image. For video, this is generated from api call. |
   * | `title`       | String    | Title copy. For video, this is generated from api call.               |
   * | `description` | String    | Description copy. For video, this is generated from api call.         |
   */
  media: PropTypes.shape({
    type: PropTypes.string,
    src: PropTypes.string,
    title: PropTypes.string,
    alt: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
export default LightboxMediaViewer;
