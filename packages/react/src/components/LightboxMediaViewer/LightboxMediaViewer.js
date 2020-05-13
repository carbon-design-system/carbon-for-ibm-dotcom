/**
 * Copyright IBM Corp. 2016, 2018
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
import { ModalBody } from 'carbon-components-react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { VideoPlayer } from '../VideoPlayer';
import { VideoPlayerAPI } from '@carbon/ibmdotcom-services';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LightboxMediaViewer Component
 *
 * @param {object} modalProps props object
 * @param {object} modalProps.media LightboxMediaViewer media object
 * @param {boolean} modalProps.open sets whether the modal is open/close
 * @returns {*} JSX Object
 */
const LightboxMediaViewer = ({ media, ...modalProps }) => {
  const [videoData, setVideoData] = useState({
    title: '',
    alt: '',
    description: '',
  });

  useEffect(() => {
    (async () => {
      if (media.type === 'video') {
        const data = await VideoPlayerAPI.api(media.src);
        setVideoData({
          title: data.name,
          alt: data.name,
          description: data.description,
        });
      } else {
        setVideoData({
          title: media.title,
          alt: media.alt,
          description: media.description,
        });
      }
    })();
  }, [media, media.src]);

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
                  <VideoPlayer videoId={media.src} />
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
                      {videoData.description &&
                        markdownToHtml(videoData.description, {
                          textOnly: true,
                          cleanString: true,
                        })}
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
  media: PropTypes.object.isRequired,
};
export default LightboxMediaViewer;
