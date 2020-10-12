/**
 * @license
 *
 * Copyright IBM Corp. 2020
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

export default {
  title: 'Components/Video player',
  decorators: [
    story => html`
      <div class="bx--grid dds-ce-demo-devenv--grid--card">
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
    percy: {
      skip: true,
    },
  },
};
