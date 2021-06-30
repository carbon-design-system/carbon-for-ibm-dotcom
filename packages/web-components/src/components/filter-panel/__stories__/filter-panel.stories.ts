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
        <bx-accordion-item title-text="Product types">
          <dds-checkbox value="API">API</dds-checkbox>
          <dds-checkbox value="Application">Application</dds-checkbox>
          <dds-checkbox value="Data Set">Data Set</dds-checkbox>
          <dds-checkbox value="Free Trial">Free Trial</dds-checkbox>
          <dds-checkbox value="Hardware">Hardware</dds-checkbox>
          <dds-checkbox value="Service">Service</dds-checkbox>
          <dds-checkbox value="Service Assets">Service Assets</dds-checkbox>
          <dds-checkbox value="Software">Software</dds-checkbox>
        </bx-accordion-item>
      </dds-filter-group>
      <dds-filter-group>
        <bx-accordion-item title-text="Technologies">
          <dds-input-select title="Analytics"></dds-input-select>
          <dds-input-select title="Artificial intelligence">
            <dds-input-select-item value="Machine Learning">Machine Learning</dds-input-select-item>
            <dds-input-select-item value="Natural language processing">Natural language processing</dds-input-select-item>
            <dds-input-select-item value="Speech recognition">Speech recognition</dds-input-select-item>
          </dds-input-select>
          <dds-input-select title="Automation"></dds-input-select>
          <dds-input-select title="Blockchain"></dds-input-select>
          <dds-input-select title="Cloud computing"></dds-input-select>
          <dds-input-select title="IT infrastructure"></dds-input-select>
          <dds-input-select title="IT managament"></dds-input-select>
          <dds-input-select title="Mobile technology"></dds-input-select>
          <dds-input-select title="Security"></dds-input-select>
          <dds-input-select title="Software development"></dds-input-select>
        </bx-accordion-item>
      </dds-filter-group>
      <dds-filter-group>
        <bx-accordion-item title-text="Business needs">
          <dds-input-select title="Business operations"></dds-input-select>
          <dds-input-select title="Content Management"></dds-input-select>
          <dds-input-select title="Customer service"></dds-input-select>
          <dds-input-select title="Finance"></dds-input-select>
          <dds-input-select title="Marketing and sales"></dds-input-select>
          <dds-input-select title="Supply chain management"></dds-input-select>
        </bx-accordion-item>
      </dds-filter-group>
      <dds-filter-group>
        <bx-accordion-item title-text="Deployment types">
          <dds-checkbox value="On-premisis">On-premisis</dds-checkbox>
          <dds-checkbox value="SaaS">SaaS</dds-checkbox>
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
