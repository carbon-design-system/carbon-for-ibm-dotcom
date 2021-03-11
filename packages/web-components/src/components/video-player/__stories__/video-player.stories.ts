/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import { VIDEO_PLAYER_CAPTION_STYLE } from '../defs';
import '../video-player-container';

const captionStyles = {
  [`Text (${VIDEO_PLAYER_CAPTION_STYLE.TEXT})`]: VIDEO_PLAYER_CAPTION_STYLE.TEXT,
  [`Card (${VIDEO_PLAYER_CAPTION_STYLE.CARD})`]: VIDEO_PLAYER_CAPTION_STYLE.CARD,
};

export const Default = ({ parameters }) => {
  const { captionStyle, videoId, aspectRatio } = parameters?.props?.VideoPlayer ?? {};
  return html`
    <dds-video-player-container
      caption-style="${ifNonNull(captionStyle)}"
      video-id="${ifNonNull(videoId)}"
      aspect-ratio="${ifNonNull(aspectRatio)}"
    >
    </dds-video-player-container>
  `;
};

export const aspectRatio1x1 = ({ parameters }) => Default({ parameters });

export const aspectRatio4x3 = ({ parameters }) => Default({ parameters });

aspectRatio4x3.story = {
  name: 'Aspect ratio 4:3',
  parameters: {
    props: {
      VideoPlayer: {
        aspectRatio: '4x3',
      },
    },
  },
};

aspectRatio1x1.story = {
  name: 'Aspect ratio 1:1',
  parameters: {
    props: {
      VideoPlayer: {
        aspectRatio: '1x1',
      },
    },
  },
};

export default {
  title: 'Components/Video player',
  decorators: [
    story => html`
      <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    props: {
      VideoPlayer: {
        videoId: '1_9h94wo6b',
      },
    },
    knobs: {
      VideoPlayer: ({ groupId }) => ({
        captionStyle: select('Caption style (caption-style)', captionStyles, VIDEO_PLAYER_CAPTION_STYLE.TEXT, groupId),
      }),
    },
    percy: {
      skip: true,
    },
  },
};
