/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import readme from './README.stories.mdx';
import '../video-player-container';

export const Default = () => html`
  <dds-video-player-container video-id="1_9h94wo6b"></dds-video-player-container>
`;

export const aspectRatio1x1 = ({ parameters }) => {
  const { videoId, aspectRatio } = parameters?.props?.VideoPlayer ?? {};
  return html`
    <dds-video-player-container video-id=${videoId} aspect-ratio=${aspectRatio}></dds-video-player-container>
  `;
};

export const aspectRatio4x3 = ({ parameters }) => {
  const { videoId, aspectRatio } = parameters?.props?.VideoPlayer ?? {};
  return html`
    <dds-video-player-container video-id=${videoId} aspect-ratio=${aspectRatio}></dds-video-player-container>
  `;
};

aspectRatio4x3.story = {
  name: 'Aspect ratio 4:3',
  parameters: {
    knobs: {
      VideoPlayer: () => {
        return {
          aspectRatio: '4x3',
          videoId: '1_9h94wo6b',
        };
      },
    },
  },
};

aspectRatio1x1.story = {
  name: 'Aspect ratio 1:1',
  parameters: {
    knobs: {
      VideoPlayer: () => {
        return {
          aspectRatio: '1x1',
          videoId: '1_9h94wo6b',
        };
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
    percy: {
      skip: true,
    },
  },
};
