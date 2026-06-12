/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../audio-player-container';
import readme from './README.stories.mdx';

export default {
  title: 'Components/Audio Player',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
  },
};

export const Default = (args) => {
  const { mediaId, autoPlay, muted, audioTitle, uiConfId, partnerId } = args?.['c4d-audio-player-container'] ?? {};
  
  return html`
    <c4d-audio-player-container
      media-id="${ifDefined(mediaId)}"
      ?auto-play="${autoPlay}"
      ?muted="${muted}"
      audio-title="${ifDefined(audioTitle)}"
      ui-conf-id="${ifDefined(uiConfId)}"
      partner-id="${ifDefined(partnerId)}">
    </c4d-audio-player-container>
  `;
};

Default.story = {
  name: 'Default',
  parameters: {
    knobs: {
      'c4d-audio-player-container': () => ({
        mediaId: '1_9h94wo6b',
        autoPlay: false,
        muted: false,
        audioTitle: '',
        uiConfId: '',
        partnerId: '',
      }),
    },
    propsSet: {
      default: {
        'c4d-audio-player-container': {
          mediaId: '1_9h94wo6b',
          autoPlay: false,
          muted: false,
          audioTitle: '',
          uiConfId: '',
          partnerId: '',
        },
      },
    },
  },
};

export const WithAutoplay = (args) => {
  const { mediaId, autoPlay, muted, audioTitle, uiConfId, partnerId } = args?.['c4d-audio-player-container'] ?? {};
  
  return html`
    <c4d-audio-player-container
      media-id="${ifDefined(mediaId)}"
      ?auto-play="${autoPlay}"
      ?muted="${muted}"
      audio-title="${ifDefined(audioTitle)}"
      ui-conf-id="${ifDefined(uiConfId)}"
      partner-id="${ifDefined(partnerId)}">
    </c4d-audio-player-container>
  `;
};

WithAutoplay.story = {
  name: 'With Autoplay',
  parameters: {
    knobs: {
      'c4d-audio-player-container': () => ({
        mediaId: '1_9h94wo6b',
        autoPlay: true,
        muted: false,
        audioTitle: '',
        uiConfId: '',
        partnerId: '',
      }),
    },
    propsSet: {
      default: {
        'c4d-audio-player-container': {
          mediaId: '1_9h94wo6b',
          autoPlay: true,
          muted: false,
          audioTitle: '',
          uiConfId: '',
          partnerId: '',
        },
      },
    },
  },
};




