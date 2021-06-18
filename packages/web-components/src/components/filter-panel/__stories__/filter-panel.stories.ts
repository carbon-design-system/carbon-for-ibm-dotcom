/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// import { text, select, boolean, number } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import '../filter-panel';
import '../input_select';
import '../filter-group';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Input = () => {
  return html`
    <dds-input-select></dds-input-select>
  `;
};

export const Filter = () => {
  return html`
    <dds-filter-group>hi</dds-filter-group>
  `;
};

export const real = () => {
  return html`
    <dds-filter-panel></dds-filter-panel>
  `;
};

export default {
  title: 'Components/Filter Panel',
  decorators: [
    story =>
      html`
        <div class="bx--grid">
          <div class="bx--row">
            <div>
              ${story()}
            </div>
          </div>
        </div>
      `,
  ],
  knobs: {
    'dds-filter-panel': ({ groupId }) => ({
      alt: textNullable('Alt text', 'Image alt text', groupId),
    }),
  },
};
