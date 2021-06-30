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
import '../input_select_item';
import '../filter-group';
import '../filter-panel-composite';
import '../checkbox';
import 'carbon-web-components/es/components/accordion/accordion';
import 'carbon-web-components/es/components/accordion/accordion-item';

import styles from './filter-panel.stories.scss';

export const FilterPanel = () => {
  return html`
    <style>
      ${styles}
    </style>
    <dds-filter-panel-composite>
      <dds-filter-group>
        <bx-accordion-item title-text="Category Headline 1">
          <dds-input-select title="Content Management">
            <dds-input-select-item value="andy">andy</dds-input-select-item>
            <dds-input-select-item value="ignacio">ignacio</dds-input-select-item>
          </dds-input-select>
        </bx-accordion-item>
      </dds-filter-group>

      <dds-filter-group>
        <bx-accordion-item title-text="Checkbox 1">
          <dds-checkbox value="Business Operations">Business Operations</dds-checkbox>
          <dds-checkbox value="Artificial Intelligence">Artificial Intelligence</dds-checkbox>
          <dds-checkbox value="Collaboration">Collaboration</dds-checkbox>
        </bx-accordion-item>
      </dds-filter-group>

      <dds-filter-group title="Category headline 3">
        <bx-accordion-item title-text="Checkbox 2">
          <dds-checkbox value="Artifical Intelligence">Artificial Intelligence</dds-checkbox>
        </bx-accordion-item>
      </dds-filter-group>

      <dds-filter-group title="Category headline 4">
        <bx-accordion-item title-text="Checkbox 3">
          <dds-checkbox value="test">Test</dds-checkbox>
        </bx-accordion-item>
      </dds-filter-group>
    </dds-filter-panel-composite>
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
