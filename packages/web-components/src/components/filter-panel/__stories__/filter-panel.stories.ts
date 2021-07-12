/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { text, select } from '@storybook/addon-knobs';
import '../filter-panel';
import '../filter-panel-heading';
import '../filter-panel-modal';
import '../input_select';
import '../input_select_item';
import '../filter-group';
import '../filter-panel-composite';
import '../checkbox';
import '../filter-group-item';
import 'carbon-web-components/es/components/accordion/accordion';
import 'carbon-web-components/es/components/accordion/accordion-item';
import readme from './README.stories.mdx';

import styles from './filter-panel.stories.scss';

export const Default = ({ parameters }) => {
  const { heading, gridKnobs } = parameters?.props?.FilterPanel ?? {};
  return html`
    <style>
      ${styles}
    </style>
    <div class="grid-alignment ${gridKnobs === '3' ? 'bx--col-lg-3' : 'bx--col-lg-4'}">
      <dds-filter-panel-composite>
        <dds-filter-panel-heading slot="heading">${heading}</dds-filter-panel-heading>
        <dds-filter-group>
          <dds-filter-group-item title-text="Product types">
            <dds-checkbox value="API">API</dds-checkbox>
            <dds-checkbox value="Application">Application</dds-checkbox>
            <dds-checkbox value="Data Set">Data Set</dds-checkbox>
            <dds-checkbox value="Free Trial">Free Trial</dds-checkbox>
            <dds-checkbox value="Hardware">Hardware</dds-checkbox>
            <dds-checkbox value="Service">Service</dds-checkbox>
            <dds-checkbox value="Service Assets">Service Assets</dds-checkbox>
            <dds-checkbox value="Software">Software</dds-checkbox>
          </dds-filter-group-item>
        </dds-filter-group>
        <dds-filter-group>
          <dds-filter-group-item title-text="Technologies">
            <dds-input-select header-value="Analytics" title="Analytics"></dds-input-select>
            <dds-input-select header-value="Artificial intelligence" title="Artificial intelligence">
              <dds-input-select-item value="Machine Learning">Machine Learning</dds-input-select-item>
              <dds-input-select-item value="Natural language processing">Natural language processing</dds-input-select-item>
              <dds-input-select-item value="Speech recognition">Speech recognition</dds-input-select-item>
            </dds-input-select>
            <dds-input-select header-value="Automation" title="Automation"></dds-input-select>
            <dds-input-select header-value="Blockchain" title="Blockchain"></dds-input-select>
            <dds-input-select header-value="Cloud computing" title="Cloud computing"></dds-input-select>
            <dds-input-select header-value="IT infrastructure" title="IT infrastructure"></dds-input-select>
            <dds-input-select header-value="IT managament" title="IT managament"></dds-input-select>
            <dds-input-select header-value="Mobile technology" title="Mobile technology"></dds-input-select>
            <dds-input-select header-value="Security" title="Security"></dds-input-select>
            <dds-input-select header-value="Software development" title="Software development"></dds-input-select>
          </dds-filter-group-item>
        </dds-filter-group>
        <dds-filter-group>
          <dds-filter-group-item title-text="Business needs">
            <dds-input-select header-value="Business operations" title="Business operations"></dds-input-select>
            <dds-input-select header-value="Content Management" title="Content Management"></dds-input-select>
            <dds-input-select header-value="Customer service" title="Customer service"></dds-input-select>
            <dds-input-select header-value="Finance" title="Finance"></dds-input-select>
            <dds-input-select header-value="Marketing and sales" title="Marketing and sales"></dds-input-select>
            <dds-input-select header-value="Supply chain management" title="Supply chain management"></dds-input-select>
          </dds-filter-group-item>
        </dds-filter-group>
        <dds-filter-group>
          <dds-filter-group-item title-text="Deployment types">
            <dds-checkbox value="On-premisis">On-premisis</dds-checkbox>
            <dds-checkbox value="SaaS">SaaS</dds-checkbox>
          </dds-filter-group-item>
        </dds-filter-group>
      </dds-filter-panel-composite>
    </div>
  `;
};

export default {
  title: 'Components/Filter panel',
  decorators: [
    story =>
      html`
        ${story()}
      `,
  ],
  hasGrid: true,
  parameters: {
    ...readme.parameters,
    knobs: {
      FilterPanel: ({ groupId }) => ({
        heading: text('heading', 'Filter', groupId),
        gridKnobs: select('gridKnobs', ['3', '4'], '4', groupId),
      }),
    },
  },
};
