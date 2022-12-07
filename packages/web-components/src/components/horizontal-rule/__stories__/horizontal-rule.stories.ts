/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from '@carbon/web-components/es/globals/directives/if-non-null.js';
import '../horizontal-rule';
import readme from './README.stories.mdx';

export const Default = (args) => {
  const { type, size, contrast, weight } = args ?? {};
  return html`
    <dds-hr
      type="${ifNonNull(type)}"
      size="${ifNonNull(size)}"
      contrast="${ifNonNull(contrast)}"
      weight="${ifNonNull(weight)}">
    </dds-hr>
  `;
};

const types = ['solid', 'dashed'];

const sizes = ['small', 'medium', 'large', 'fluid'];

const contrasts = ['low-contrast', 'medium-contrast', 'high-contrast'];

const weights = ['thin', 'thick'];

export default {
  title: 'Components/Horizontal rule',
  component: 'dds-hr',
  argTypes: {
    type: {
      control: { type: 'select' },
      options: types,
      defaultValue: 'solid',
    },
    size: {
      control: { type: 'select' },
      options: sizes,
      defaultValue: 'fluid',
    },
    contrast: {
      control: { type: 'select' },
      options: contrasts,
      defaultValue: contrasts['medium-contrast'],
    },
    weight: {
      control: { type: 'select' },
      options: weights,
      defaultValue: 'thin',
    },
    styles: {
      table: {
        disable: true,
      },
    },
  },
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
    propsSet: {
      default: {
        HorizontalRule: {
          type: 'solid',
          size: 'fluid',
          contrast: contrasts['medium-contrast'],
          weight: 'weights',
        },
      },
    },
  },
};
