/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import { html } from 'lit-element';
// import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
// import readme from './README.stories.mdx';
// import textNullable from '../../../../.storybook/knob-text-nullable';
import '../horizontal-rule';

export const Default = ({ parameters }) => {
  const { type, size, contrast, weight } = parameters?.props?.HorizontalRule ?? {};
  return html`
    <dds-hr type=${type} size=${size} contrast=${contrast} weight=${weight} />
  `;
};

const types = {
  solid: undefined,
  dashed: 'dashed',
};

const sizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
  fluid: undefined,
};

const contrasts = {
  'low-contrast': 'low-contrast',
  'medium-contrast': undefined,
  'high-contrast': 'high-contrast',
};

const weights = {
  thin: undefined,
  thick: 'thick',
};

export default {
  title: 'Components/Horizontal Rule',
  decorators: [
    story => html`
      <div class="bx--grid bx--grid--condensed">
        <div class="bx--row">
          <div class="bx--col-lg-9">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    // ...readme.parameters,
    knobs: {
      HorizontalRule: ({ groupId }) => ({
        type: select('Type (type):', types, types.solid, groupId),
        size: select('Size (size):', sizes, sizes.fluid, groupId),
        contrast: select('Contrast (contrast):', contrasts, contrasts['medium-contrast'], groupId),
        weight: select('Weight (weight):', weights, weights.thin, groupId),
      }),
    },
  },
};
