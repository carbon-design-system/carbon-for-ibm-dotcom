/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../filter-panel';
import '../filter-panel-modal';
import '../input_select';
import '../filter-group';
import '../filter-panel-composite';

import styles from './filter-panel.stories.scss';

export const FilterPanel = () => {
  return html`
    <style>
      ${styles}
    </style>
    <dds-filter-panel-composite> </dds-filter-panel-composite>
  `;
};

export default {
  title: 'Components/Filter Panel',
  decorators: [
    story =>
      html`
        <div class="bx--grid bx--grid--condensed" style="width: 100%">
          <div class="bx--row">
            <div class="bx--col-sm-16 bx--col-md-6 bx--col-lg-16">
              ${story()}
            </div>
          </div>
        </div>
      `,
  ],
  knobs: {
    'dds-filter-panel': () => ({}),
  },
};
