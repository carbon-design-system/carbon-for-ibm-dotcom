/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { select } from '@storybook/addon-knobs';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../image';
import readme from './README.stories.mdx';

const images = {
  '2:1': 'https://dummyimage.com/672x336/ee5396/161616&text=2:1',
  '16:9': 'http://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616',
};

const srcsets = {
  'https://dummyimage.com/672x336/ee5396/161616&text=2:1': [
    'https://dummyimage.com/320x160/ee5396/161616&text=2:1',
    'https://dummyimage.com/400x200/ee5396/161616&text=2:1',
    'https://dummyimage.com/672x336/ee5396/161616&text=2:1',
  ],
  'http://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616': [
    'http://fpoimg.com/672x672?text=16:9&bg_color=ee5396&text_color=161616',
    'http://fpoimg.com/400x225?text=16:9&bg_color=ee5396&text_color=161616',
    'http://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616',
  ],
};

export const Default = ({ parameters }) => {
  const { alt, defaultSrc } = parameters?.props?.['dds-image'] ?? {};
  // TODO: See if we can fix unwanted `&` to `&amp` conversion upon changing the select knob
  const srcset = srcsets[defaultSrc?.replace(/&amp;/, '&')];
  return html`
    <dds-image alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}">
      ${!srcset
        ? undefined
        : html`
            <dds-image-item media="(min-width: 672px)" srcset="${srcset[2]}"> </dds-image-item>
            <dds-image-item media="(min-width: 400px)" srcset="${srcset[1]}"> </dds-image-item>
            <dds-image-item media="(min-width: 320px)" srcset="${srcset[0]}"> </dds-image-item>
          `}
    </dds-image>
  `;
};

export default {
  title: 'Components/Image',
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
      'dds-image': ({ groupId }) => ({
        alt: textNullable('Alt text', 'Image alt text', groupId),
        defaultSrc: select(
          'Default image (default-src)',
          images,
          'https://dummyimage.com/672x336/ee5396/161616&text=2:1',
          groupId
        ),
      }),
    },
  },
};
