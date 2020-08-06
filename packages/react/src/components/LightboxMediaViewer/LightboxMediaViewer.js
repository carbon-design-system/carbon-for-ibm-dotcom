/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState, useRef } from 'react';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { ExpressiveModal } from '../ExpressiveModal';
import { Image } from '../Image';
import { ModalBody } from '../../internal/vendor/carbon-components-react/components/ComposedModal/ComposedModal';
import PropTypes from 'prop-types';
import removeHtmlTagEntities from '@carbon/ibmdotcom-utilities/es/utilities/removeHtmlTagEntities/removeHtmlTagEntities';
import settings from 'carbon-components/es/globals/js/settings';
import uniqueid from '@carbon/ibmdotcom-utilities/es/utilities/uniqueid/uniqueid';
import { VideoPlayer } from '../VideoPlayer';
import VideoPlayerAPI from '@carbon/ibmdotcom-services/es/services/VideoPlayer/VideoPlayer';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LightboxMediaViewer Component.
 */
const LightboxMediaViewer = ({ media, onClose, ...modalProps }) => {
  const [videoData, setVideoData] = useState({
    title: '',
    alt: '',
    description: '',
  });

  /**
   * Generates an ID for video title to be used by aria-labelledby.
   */
  const titleId = uniqueid('dds-');

  /**
   * Generates an ID for video description, to be used by aria-describedby.
   */
  const descriptionId = uniqueid('dds-');

  const containerRef = useRef(null);

  /**
   * Adds aria-labelledby attribute to dialog container with video title.
   */
  useEffect(() => {
    const { current: containerNode } = containerRef;
    const dialogNode = containerNode.querySelector('div[role="dialog"]');
    if (dialogNode && videoData.title) {
      dialogNode.setAttribute('aria-labelledby', titleId);
    }
  }, [titleId, videoData.title]);

  /**
   * Adds aria-describedby attribute to dialog container with video description.
   */
  useEffect(() => {
    const { current: containerNode } = containerRef;
    const dialogNode = containerNode.querySelector('div[role="dialog"]');
    if (dialogNode && videoData.description) {
      dialogNode.setAttribute('aria-describedby', descriptionId);
    }
  }, [descriptionId, videoData.description]);

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

  const videoDesc = removeHtmlTagEntities(videoData.description);

  return (
    <section
      data-autoid={`${stablePrefix}--lightbox-media-viewer`}
      className={`${prefix}--lightbox-media-viewer`}
      ref={containerRef}>
      <ExpressiveModal fullwidth={true} {...modalProps} onClose={closeModal}>
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
                      id={titleId}
                      data-autoid={`${stablePrefix}--lightbox-media-viewer__content__title`}
                      className={`${prefix}--lightbox-media-viewer__content__title`}>
                      {videoData.title}
                    </div>
                  )}
                  {videoData.description && (
                    <div
                      id={descriptionId}
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

  /**
   * Stop video on modal close
   */
  function closeModal() {
    if (onClose?.() !== false) {
      if (window.kWidget) {
        window.kWidget.addReadyCallback(function(playerId) {
          var kdp = document.getElementById(playerId);
          kdp.sendNotification('doStop');
        });
      }
    }
  }
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

  /**
   * Function to be triggered on close of Modal.
   */
  onClose: PropTypes.func,
};
export default LightboxMediaViewer;
