/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { text, select, number } from '@storybook/addon-knobs';
import '../index';
import readme from './README.stories.mdx';

export const Default = (args) => {
  const { heading, filterCutoff, maxFilters, viewAllText, gridKnobs } =
    args?.FilterPanel ?? {};
  const selectedItems = args?.FilterPanel?.selectedItems
    ? parseInt(args?.FilterPanel?.selectedItems)
    : 0;

  const filterPanelHeading = document.querySelector('c4d-filter-panel-heading');
  if (filterPanelHeading) {
    filterPanelHeading!.textContent = heading;
  }

  return html`
    <div
      class="${gridKnobs === '3 columns' ? 'cds--col-lg-3' : 'cds--col-lg-4'}"
      style="padding-right: 1rem;">
      <c4d-filter-panel-composite>
        <c4d-filter-panel-heading slot="heading"
          >${heading}</c4d-filter-panel-heading
        >
        <c4d-filter-group>
          <c4d-filter-group-item
            title="Product types"
            filter-cutoff="${filterCutoff}"
            max-filters="${maxFilters}"
            view-all-text="${viewAllText}">
            <c4d-filter-panel-checkbox
              ?checked=${selectedItems >= 1}
              value="API"
              >API</c4d-filter-panel-checkbox
            >
            <c4d-filter-panel-checkbox
              ?checked=${selectedItems >= 2}
              value="Application"
              >Application</c4d-filter-panel-checkbox
            >
            <c4d-filter-panel-checkbox
              ?checked=${selectedItems >= 3}
              value="Data Set"
              >Data Set</c4d-filter-panel-checkbox
            >
            <c4d-filter-panel-checkbox
              ?checked=${selectedItems >= 4}
              value="Free Trial"
              >Free Trial</c4d-filter-panel-checkbox
            >
            <c4d-filter-panel-checkbox
              ?checked=${selectedItems >= 5}
              value="Hardware"
              >Hardware</c4d-filter-panel-checkbox
            >
            <c4d-filter-panel-checkbox
              ?checked=${selectedItems >= 6}
              value="Service"
              >Service</c4d-filter-panel-checkbox
            >
            <c4d-filter-panel-checkbox
              ?checked=${selectedItems >= 7}
              value="Service Assets"
              >Service Assets</c4d-filter-panel-checkbox
            >
            <c4d-filter-panel-checkbox
              ?checked=${selectedItems >= 8}
              value="Software"
              >Software</c4d-filter-panel-checkbox
            >
          </c4d-filter-group-item>
          <c4d-filter-group-item title="Technologies">
            <c4d-filter-panel-input-select
              header-value="Analytics"
              title="Analytics"></c4d-filter-panel-input-select>
            <c4d-filter-panel-input-select
              header-value="Artificial intelligence"
              title="Artificial intelligence">
              <c4d-filter-panel-input-select-item value="Machine Learning"
                >Machine Learning</c4d-filter-panel-input-select-item
              >
              <c4d-filter-panel-input-select-item
                value="Natural language processing"
                >Natural language processing</c4d-filter-panel-input-select-item
              >
              <c4d-filter-panel-input-select-item value="Speech recognition"
                >Speech recognition</c4d-filter-panel-input-select-item
              >
            </c4d-filter-panel-input-select>
            <c4d-filter-panel-input-select
              header-value="Automation"
              title="Automation"></c4d-filter-panel-input-select>
            <c4d-filter-panel-input-select
              header-value="Blockchain"
              title="Blockchain"></c4d-filter-panel-input-select>
            <c4d-filter-panel-input-select
              header-value="Cloud computing"
              title="Cloud computing"></c4d-filter-panel-input-select>
            <c4d-filter-panel-input-select
              header-value="IT infrastructure"
              title="IT infrastructure"></c4d-filter-panel-input-select>
            <c4d-filter-panel-input-select
              header-value="IT management"
              title="IT management"></c4d-filter-panel-input-select>
            <c4d-filter-panel-input-select
              header-value="Mobile technologys"
              title="Mobile technology"></c4d-filter-panel-input-select>
            <c4d-filter-panel-input-select
              header-value="Security"
              title="Security"></c4d-filter-panel-input-select>
            <c4d-filter-panel-input-select
              header-value="Software development"
              title="Software development"></c4d-filter-panel-input-select>
          </c4d-filter-group-item>
          <c4d-filter-group-item title="Business needs">
            <c4d-filter-panel-input-select
              header-value="Business operations"
              title="Business operations"></c4d-filter-panel-input-select>
            <c4d-filter-panel-input-select
              header-value="Content Management"
              title="Content Management"></c4d-filter-panel-input-select>
            <c4d-filter-panel-input-select
              header-value="Customer service"
              title="Customer service"></c4d-filter-panel-input-select>
            <c4d-filter-panel-input-select
              header-value="Finance"
              title="Finance"></c4d-filter-panel-input-select>
            <c4d-filter-panel-input-select
              header-value="Marketing and sales"
              title="Marketing and sales"></c4d-filter-panel-input-select>
            <c4d-filter-panel-input-select
              header-value="Supply chain management"
              title="Supply chain management"></c4d-filter-panel-input-select>
          </c4d-filter-group-item>
          <c4d-filter-group-item title="Deployment types">
            <c4d-filter-panel-checkbox
              ?checked=${selectedItems >= 9}
              value="On-premises"
              >On-premises</c4d-filter-panel-checkbox
            >
            <c4d-filter-panel-checkbox
              ?checked=${selectedItems >= 10}
              value="SaaS"
              >SaaS</c4d-filter-panel-checkbox
            >
          </c4d-filter-group-item>
        </c4d-filter-group>
      </c4d-filter-panel-composite>
    </div>
  `;
};

export default {
  title: 'Components/Filter panel',
  decorators: [
    (story) =>
      html`
        <div class="cds--grid cds--grid--condensed">
          <div class="cds--row">${story()}</div>
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
          '2'
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
