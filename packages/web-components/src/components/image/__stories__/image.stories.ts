/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../image';
import readme from './README.stories.mdx';

export const Default = ({ parameters }) => {
  const { alt, defaultSrc } = parameters?.props?.['dds-image'] ?? {};
  return html`
    <dds-image alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}">
      <dds-image-item media="(min-width: 672px)" srcset=${defaultSrc}></dds-image-item>
      <dds-image-item media="(min-width: 400px)" srcset=${defaultSrc}></dds-image-item>
      <dds-image-item media="(min-width: 320px)" srcset=${defaultSrc}></dds-image-item>
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
        defaultSrc: textNullable('Default image', 'https://dummyimage.com/672x336/ee5396/161616&text=2x1', groupId),
      }),
    },
  },
};
