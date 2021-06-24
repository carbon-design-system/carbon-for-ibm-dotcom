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
import '../filter-panel-modal';
import '../input_select';
import '../filter-group';
import '../filter-panel-composite';
// import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
// import textNullable from '../../../../.storybook/knob-text-nullable';

import styles from './filter-panel.stories.scss';

export const Input = () => {
  return html`
    <dds-input-select title="Opting?"></dds-input-select>
  `;
};

export const FilterPanel = () => {
  return html`
<style>
${styles}
</style>
  <dds-filter-panel-composite>
  
  </dds-filter-panel-composite>

  `;
};

export default {
  title: 'Components/Filter Panel',
  decorators: [
    story =>
      html`
        ${story()}
      `,
  ],
  knobs: {
    'dds-filter-panel': () => ({}),
  },
};
