/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import ifNonNull from '../../../internal/vendor/@carbon/web-components/globals/directives/if-non-null.js';
import '../horizontal-rule';
import readme from './README.stories.mdx';

export const Default = (args) => {
  const { type, size, contrast, weight } = args?.HorizontalRule ?? {};
  return html`
    <dds-hr
      type="${ifNonNull(type)}"
      size="${ifNonNull(size)}"
      contrast="${ifNonNull(contrast)}"
      weight="${ifNonNull(weight)}">
    </dds-hr>
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
  title: 'Components/Horizontal rule',
  decorators: [
    (story) => html`
      <div class="bx--grid bx--grid--condensed">
        <div class="bx--row">
          <div class="bx--col-lg-12">
            <h2>Horizontal Rule</h2>
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      HorizontalRule: () => ({
        type: select('Type (type):', types, types.solid),
        size: select('Size (size):', sizes, sizes.fluid),
        contrast: select(
          'Contrast (contrast):',
          contrasts,
          contrasts['medium-contrast']
        ),
        weight: select('Weight (weight):', weights, weights.thin),
      }),
    },
    propsSet: {
      default: {
        HorizontalRule: {
          type: types.solid,
          size: sizes.fluid,
          contrast: contrasts['medium-contrast'],
          weight: weights.thin,
        },
      },
    },
  },
};
