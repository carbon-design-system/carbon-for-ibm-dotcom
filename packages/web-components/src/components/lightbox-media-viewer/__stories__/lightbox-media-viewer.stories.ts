/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import 'carbon-web-components/es/components/modal/modal-close-button';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../lightbox-video-player-container';
import styles from './lightbox-media-viewer.stories.scss';
import readme from './README.stories.mdx';

export const EmbeddedVideoPlayer = ({ parameters }) => {
  const { open, disableClose, onBeforeClose, onClose } = parameters?.props?.Modal ?? {};
  const { hideCaption, videoId } = parameters?.props?.LightboxVideoPlayerContainer ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose?.(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return html`
    <style>
      ${styles}
    </style>
    <dds-lightbox-video-player-container
      ?hide-caption="${hideCaption}"
      ?open="${open}"
      video-id="${videoId}"
      @dds-modal-beingclosed="${handleBeforeClose}"
      @dds-modal-closed="${onClose}"
    >
    </dds-lightbox-video-player-container>
  `;
};

export default {
  title: 'Components/Lightbox media viewer',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
    knobs: {
      Modal: ({ groupId }) => ({
        open: boolean('Open (open)', true, groupId),
        disableClose: boolean(
          'Disable user-initiated close action (Call event.preventDefault() in dds-modal-beingclosed event)',
          false,
          groupId
        ),
        onBeforeClose: action('dds-modal-beingclosed'),
        onClose: action('dds-modal-closed'),
      }),
      LightboxVideoPlayerContainer: ({ groupId }) => ({
        hideCaption: boolean('hide caption (hide-caption)', false, groupId),
        videoId: textNullable('Video ID (video-id)', '0_uka1msg4', groupId),
      }),
    },
  },
};
