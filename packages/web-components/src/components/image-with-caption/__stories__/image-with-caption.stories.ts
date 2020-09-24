/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../image-with-caption';

export const Default = ({ parameters }) => {
  const { } = parameters?.props?.['dds-image-with-caption'] ?? {};
  return html `
  <dds-image-with-caption></dds-image-with-caption>
  `
}

export default {
  title: 'Components/ImageWithCaption',
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
    // ...readme.parameters,
    knobs: {
      'dds-image-with-caption': ({ groupId }) => ({
        alt: textNullable('Alt text', 'Image alt text', groupId),
        defaultSrc: textNullable('Default image', 'https://dummyimage.com/672x336/ee5396/161616&text=2x1', groupId),
      }),
    },
  },
}
