/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../background-media';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import '../background-media';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--005.jpg';

import readme from './README.stories.mdx';



const images = {
  '2:1': imgLg2x1,
  '16:9': imgLg16x9,
};

const gradient_directions = {
  'left': 'left',
  'top': 'top',
};

const mobile_positions = {
  'top': 'top',
  'bottom': 'bottom',
};

export const Default = ({ parameters }) => {
  const { source, gradient_direction, mobile_position } = parameters?.props?.['dds-background-media'] ?? {};

  return html`
    <dds-background-media source="${ifNonNull(source)}" gradient-direction="${ifNonNull(gradient_direction)}" mobile-position="${ifNonNull(mobile_position)}">
     
    </dds-background-media>
  `;
};

export default {
  title: 'Components/Background Media',
  decorators: [
    story =>
      html`
        <div class="bx--grid">
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
    knobs: {
      'dds-background-media': ({ groupId }) => ({
        source: select('Default image (default-src)', images, imgLg2x1, groupId),
        gradient_direction: select('Gradient Direction (gradient-direction):', gradient_directions, gradient_directions.left, groupId),
        mobile_position: select('Mobile Position (mobile-position):', mobile_positions, mobile_positions.top, groupId),
      }),
    },
  },
};
