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
import '../../modal/modal';
import '../lightbox-media-viewer-body';
import '../lightbox-video-player-container';
import styles from './lightbox-media-viewer.stories.scss';
import readme from './README.stories.mdx';

export const EmbeddedVideoPlayer = ({ parameters }) => {
  const { open, disableClose, onBeforeClose, onClose } = parameters?.props?.['dds-modal'] ?? {};
  const { hideCaption, videoId } = parameters?.props?.['dds-lightbox-video-player-container'] ?? {};
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
    <dds-lightbox-video-player-container ?hide-caption="${hideCaption}" video-id="${videoId}">
      <dds-modal
        ?open="${open}"
        expressive-size="full-width"
        @dds-modal-beingclosed="${handleBeforeClose}"
        @dds-modal-closed="${onClose}"
      >
        <bx-modal-close-button></bx-modal-close-button>
        <dds-lightbox-media-viewer-body></dds-lightbox-media-viewer-body>
      </dds-modal>
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
      'dds-modal': ({ groupId }) => ({
        open: boolean('Open (open)', true, groupId),
        disableClose: boolean(
          'Disable user-initiated close action (Call event.preventDefault() in dds-modal-beingclosed event)',
          false,
          groupId
        ),
        onBeforeClose: action('dds-modal-beingclosed'),
        onClose: action('dds-modal-closed'),
      }),
      'dds-lightbox-video-player-container': ({ groupId }) => ({
        hideCaption: boolean('hide caption (hide-caption)', false, groupId),
        videoId: textNullable('Video ID (video-id)', '0_uka1msg4', groupId),
      }),
    },
  },
};
