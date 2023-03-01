/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState, useRef } from 'react';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { ExpressiveModal } from '../ExpressiveModal';
import { Image } from '../Image';
import KalturaPlayerAPI from '../../internal/vendor/@carbon/ibmdotcom-services/services/KalturaPlayer/KalturaPlayer';
import { ModalBody } from '../../internal/vendor/carbon-components-react/components/ComposedModal/ComposedModal';
import PropTypes from 'prop-types';
import removeHtmlTagEntities from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/removeHtmlTagEntities/removeHtmlTagEntities';
import root from 'window-or-global';
import settings from 'carbon-components/es/globals/js/settings';
import uniqueid from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/uniqueid/uniqueid';
import { VideoPlayer } from '../VideoPlayer';

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
    if (dialogNode && (media.title || videoData.title)) {
      dialogNode.setAttribute('aria-label', media.title || videoData.title);
    }
  }, [titleId, media.title, videoData.title]);

  useEffect(() => {
    let stale = false;
    (async () => {
      if (media.type === 'video') {
        const data = await KalturaPlayerAPI.api(media.src);
        if (!stale) {
          setVideoData({
            title: media.title ? media.title : data.name,
            alt: media.title ? media.title : data.name,
            description: media.description
              ? media.description
              : data.description,
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
                  <VideoPlayer videoId={media.src} autoPlay={modalProps.open} />
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
    if (onClose?.() !== false && root.kWidget) {
      root.kWidget.addReadyCallback((videoId) => {
        const kdp = document.getElementById(videoId);
        kdp.sendNotification('doStop');
      });
    }
  }
};

LightboxMediaViewer.propTypes = {
  /**
   * Object containing media info. The structure is:
   *
   * | Name          | Data Type | Description                                                                                                            |
   * | ------------- | --------- | ---------------------------------------------------------------------------------------------------------------------- |
   * | `type`        | String    | Determines whether to render `image` or `video`                                                                        |
   * | `src`         | String    | Image link or video id                                                                                                 |
   * | `alt`         | String    | Alternate text for image. For video, this is generated from api call.                                                  |
   * | `title`       | String    | Overrides the Kaltura video title if `type=video`.       |
   * | `description` | String    | Overrides the Kaltura video description if `type=video`. |
   */
  media: PropTypes.shape({
    type: PropTypes.string,
    src: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    alt: PropTypes.string,
  }).isRequired,

  /**
   * Function to be triggered on close of Modal.
   */
  onClose: PropTypes.func,
};
export default LightboxMediaViewer;
