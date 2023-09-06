/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select } from '@storybook/addon-knobs';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../horizontal-rule';
import readme from './README.stories.mdx';

export const Default = (args) => {
  const { type, size, contrast, weight } = args?.HorizontalRule ?? {};
  return html`
    <c4d-hr
      type="${ifDefined(type)}"
      size="${ifDefined(size)}"
      contrast="${ifDefined(contrast)}"
      weight="${ifDefined(weight)}">
    </c4d-hr>
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
  strong: 'strong',
  subtle: 'subtle',
};

const weights = {
  thin: undefined,
  thick: 'thick',
};

export default {
  title: 'Components/Horizontal rule',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-12">
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
          contrasts['strong']
        ),
        weight: select('Weight (weight):', weights, weights.thin),
      }),
    },
    propsSet: {
      default: {
        HorizontalRule: {
          type: types.solid,
          size: sizes.fluid,
          contrast: contrasts['strong'],
          weight: weights.thin,
        },
      },
    },
  },
};
