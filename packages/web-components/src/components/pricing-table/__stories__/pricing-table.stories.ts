/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, TemplateResult } from 'lit-element';
import { number, text } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import '../index';
import 'carbon-web-components/es/components/tooltip/index';
// import textNullable from '../../../../.storybook/knob-text-nullable';

const renderHeaderCell = name => html`
  <dds-pricing-table-header-cell>
    <dds-pricing-table-header-cell-headline>Variation ${name}</dds-pricing-table-header-cell-headline>
    <dds-pricing-table-header-cell-caption>Starting at $X.XX per user</dds-pricing-table-header-cell-caption>
    <dds-pricing-table-header-cell-tag href="https://www.example.com">Merchandising</dds-pricing-table-header-cell-tag>
    <dds-pricing-table-header-cell-description>
      Lorem ipsum dolor sit amet consectetur.
      <bx-unordered-list>
        <bx-list-item>Lorem ipsum dolor</bx-list-item>
        <bx-list-item>sit amet</bx-list-item>
        <bx-list-item>consectetur retention adispiscing elit sed do eiusm Eiusmod tempor</bx-list-item>
      </bx-unordered-list>
    </dds-pricing-table-header-cell-description>
    <dds-pricing-table-header-cell-cta href="https://www.example.com">Call to action</dds-pricing-table-header-cell-cta>
  </dds-pricing-table-header-cell>
`;

const renderHead = columnCount => html`
  <dds-pricing-table-head>
    <dds-pricing-table-header-row>
      <dds-pricing-table-header-cell></dds-pricing-table-header-cell>
      ${(() => {
        const cells: TemplateResult[] = [];
        for (let i = 1; i < columnCount; i++) {
          cells.push(renderHeaderCell(i));
        }
        return cells;
      })()}
    </dds-pricing-table-header-row>
  </dds-pricing-table-head>
`;

const bodyCellTypeMap = {
  text: 'text',
  icon: 'icon',
  tags: 'tags',
};

const renderBodyCell = (type = bodyCellTypeMap.text) => {
  let content;
  if (type === bodyCellTypeMap.text) {
    content = html`
      <dds-pricing-table-cell>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue.
        Aenean posuere sem vel euismod dignissim.
      </dds-pricing-table-cell>
    `;
  }

  if (type === bodyCellTypeMap.icon) {
    content = html`
      <dds-pricing-table-cell icon="checkmark">
        Cell with icon
      </dds-pricing-table-cell>
    `;
  }

  if (type === bodyCellTypeMap.tags) {
    content = html`
      <dds-pricing-table-cell tags="Merchandising Offer, Secondary Tag, Other">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue.
        Aenean posuere sem vel euismod dignissim.
      </dds-pricing-table-cell>
    `;
  }

  return content;
};

const renderBodyRow = (columnCount, rowNum) => html`
  <dds-pricing-table-row>
    ${(() => {
      const cells: TemplateResult[] = [
        html`
          <dds-pricing-table-header-cell scope="row">Row ${rowNum}</dds-pricing-table-header-cell>
        `,
      ];
      for (let i = 1; i < columnCount; i++) {
        cells.push(renderBodyCell(bodyCellTypeMap[i + 1]));
      }
      return cells;
    })()}
  </dds-pricing-table-row>
`;

export const Default = ({ parameters }) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4, highlightCol, highlightLabel, columnCount } =
    parameters?.props?.PricingTable ?? {};
  return html`
    <dds-pricing-table
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}"
      highlight-column="${highlightCol}"
      highlight-label="${highlightLabel}"
    >
      ${renderHead(columnCount)}
      <dds-pricing-table-body>
        ${renderBodyRow(columnCount, 1)} ${renderBodyRow(columnCount, 2)} ${renderBodyRow(columnCount, 3)}
      </dds-pricing-table-body>
    </dds-pricing-table>
  `;
};

export const WithSubheaders = ({ parameters }) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4, columnCount, highlightCol, highlightLabel } =
    parameters?.props?.PricingTable ?? {};
  return html`
    <dds-pricing-table
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}"
      highlight-column="${highlightCol}"
      highlight-label="${highlightLabel}"
    >
      ${renderHead(columnCount)}
      <dds-pricing-table-body>
        <dds-pricing-table-group title="Group 1">
          ${renderBodyRow(columnCount, 1)} ${renderBodyRow(columnCount, 2)} ${renderBodyRow(columnCount, 3)}
        </dds-pricing-table-group>
        <dds-pricing-table-group title="Group 2">
          ${renderBodyRow(columnCount, 1)} ${renderBodyRow(columnCount, 2)} ${renderBodyRow(columnCount, 3)}
        </dds-pricing-table-group>
        <dds-pricing-table-group title="Group 3">
          ${renderBodyRow(columnCount, 1)} ${renderBodyRow(columnCount, 2)} ${renderBodyRow(columnCount, 3)}
        </dds-pricing-table-group>
      </dds-pricing-table-body>
    </dds-pricing-table>
  `;
};

export default {
  title: 'Components/Pricing Table',
  parameters: {
    ...readme.parameters,
    knobs: {
      PricingTable: () => ({
        columnCount: number('number of columns', 3),
        highlightCol: number('highlighted column', 2),
        highlightLabel: text('highlighted label', 'Featured'),
        // colSpan1: textNullable('col-span-1', ''),
        // colSpan2: textNullable('col-span-2', ''),
        // colSpan3: textNullable('col-span-3', ''),
        // colSpan4: textNullable('col-span-4', ''),
      }),
    },
  },
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-16">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
};
