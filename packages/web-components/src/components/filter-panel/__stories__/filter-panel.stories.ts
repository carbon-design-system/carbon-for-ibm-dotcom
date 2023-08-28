/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { text, select, number } from '@storybook/addon-knobs';
import '../index';
import readme from './README.stories.mdx';

export const Default = (args) => {
  const { heading, filterCutoff, maxFilters, viewAllText, gridKnobs } =
    args?.FilterPanel ?? {};
  const selectedItems = parseInt(args?.FilterPanel.selectedItems);

  const filterPanelHeading = document.querySelector('dds-filter-panel-heading');
  if (filterPanelHeading) {
    filterPanelHeading!.textContent = heading;
  }

  return html`
    <div
      class="${gridKnobs === '3 columns' ? 'bx--col-lg-3' : 'bx--col-lg-4'}"
      style="padding-right: 1rem;">
      <dds-filter-panel-composite>
        <dds-filter-panel-heading slot="heading"
          >${heading}</dds-filter-panel-heading
        >
        <dds-filter-group>
          <dds-filter-group-item
            title-text="Product types"
            filter-cutoff="${filterCutoff}"
            max-filters="${maxFilters}"
            view-all-text="${viewAllText}">
            <dds-filter-panel-checkbox
              ?checked=${selectedItems >= 1}
              value="API"
              >API</dds-filter-panel-checkbox
            >
            <dds-filter-panel-checkbox
              ?checked=${selectedItems >= 2}
              value="Application"
              >Application</dds-filter-panel-checkbox
            >
            <dds-filter-panel-checkbox
              ?checked=${selectedItems >= 3}
              value="Data Set"
              >Data Set</dds-filter-panel-checkbox
            >
            <dds-filter-panel-checkbox
              ?checked=${selectedItems >= 4}
              value="Free Trial"
              >Free Trial</dds-filter-panel-checkbox
            >
            <dds-filter-panel-checkbox
              ?checked=${selectedItems >= 5}
              value="Hardware"
              >Hardware</dds-filter-panel-checkbox
            >
            <dds-filter-panel-checkbox
              ?checked=${selectedItems >= 6}
              value="Service"
              >Service</dds-filter-panel-checkbox
            >
            <dds-filter-panel-checkbox
              ?checked=${selectedItems >= 7}
              value="Service Assets"
              >Service Assets</dds-filter-panel-checkbox
            >
            <dds-filter-panel-checkbox
              ?checked=${selectedItems >= 8}
              value="Software"
              >Software</dds-filter-panel-checkbox
            >
          </dds-filter-group-item>
          <dds-filter-group-item title-text="Technologies">
            <dds-filter-panel-input-select
              header-value="Analytics"
              title="Analytics"
              selected
              is-open></dds-filter-panel-input-select>
            <dds-filter-panel-input-select
              header-value="Artificial intelligence"
              title="Artificial intelligence">
              <dds-filter-panel-input-select-item value="Machine Learning"
                >Machine Learning</dds-filter-panel-input-select-item
              >
              <dds-filter-panel-input-select-item
                value="Natural language processing"
                >Natural language processing</dds-filter-panel-input-select-item
              >
              <dds-filter-panel-input-select-item value="Speech recognition"
                >Speech recognition</dds-filter-panel-input-select-item
              >
            </dds-filter-panel-input-select>
            <dds-filter-panel-input-select
              header-value="Automation"
              title="Automation"></dds-filter-panel-input-select>
            <dds-filter-panel-input-select
              header-value="Blockchain"
              title="Blockchain"></dds-filter-panel-input-select>
            <dds-filter-panel-input-select
              header-value="Cloud computing"
              title="Cloud computing"></dds-filter-panel-input-select>
            <dds-filter-panel-input-select
              header-value="IT infrastructure"
              title="IT infrastructure"></dds-filter-panel-input-select>
            <dds-filter-panel-input-select
              header-value="IT management"
              title="IT management"></dds-filter-panel-input-select>
            <dds-filter-panel-input-select
              header-value="Mobile technologys"
              title="Mobile technology"></dds-filter-panel-input-select>
            <dds-filter-panel-input-select
              header-value="Security"
              title="Security"></dds-filter-panel-input-select>
            <dds-filter-panel-input-select
              header-value="Software development"
              title="Software development"></dds-filter-panel-input-select>
          </dds-filter-group-item>
          <dds-filter-group-item title-text="Business needs">
            <dds-filter-panel-input-select
              header-value="Business operations"
              title="Business operations"></dds-filter-panel-input-select>
            <dds-filter-panel-input-select
              header-value="Content Management"
              title="Content Management"></dds-filter-panel-input-select>
            <dds-filter-panel-input-select
              header-value="Customer service"
              title="Customer service"></dds-filter-panel-input-select>
            <dds-filter-panel-input-select
              header-value="Finance"
              title="Finance"></dds-filter-panel-input-select>
            <dds-filter-panel-input-select
              header-value="Marketing and sales"
              title="Marketing and sales"></dds-filter-panel-input-select>
            <dds-filter-panel-input-select
              header-value="Supply chain management"
              title="Supply chain management"></dds-filter-panel-input-select>
          </dds-filter-group-item>
          <dds-filter-group-item title-text="Deployment types">
            <dds-filter-panel-checkbox
              ?checked=${selectedItems >= 9}
              value="On-premises"
              >On-premises</dds-filter-panel-checkbox
            >
            <dds-filter-panel-checkbox
              ?checked=${selectedItems >= 10}
              value="SaaS"
              >SaaS</dds-filter-panel-checkbox
            >
          </dds-filter-group-item>
        </dds-filter-group>
      </dds-filter-panel-composite>
    </div>
  `;
};

export default {
  title: 'Components/Filter panel',
  decorators: [
    (story) =>
      html`
        <div class="bx--grid bx--grid--condensed">
          <div class="bx--row">${story()}</div>
        </div>
      `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      FilterPanel: () => ({
        heading: text('heading', 'Filter'),
        filterCutoff: number('Filter cutoff', 5, {}),
        maxFilters: number('Max filters', 7, {}),
        viewAllText: text('View all text', 'View all'),
        gridKnobs: select(
          'Grid alignment',
          ['3 columns', '4 columns'],
          '4 columns'
        ),
        selectedItems: select(
          'Number of selected items',
          ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          '0'
        ),
      }),
    },
    propsSet: {
      default: {
        FilterPanel: {
          heading: 'Filter',
          filterCutoff: 5,
          maxFilters: 7,
          viewAllText: 'View all',
          gridKnobs: '4 columns',
        },
      },
    },
  },
};
