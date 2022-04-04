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
import textNullable from '../../../../.storybook/knob-text-nullable';

enum CELL_TYPES {
  TEXT = 'text',
  ICON = 'icon',
  EMPTY = 'empty',
}

const renderHeaderCell = name => html`
  <dds-pricing-table-header-cell>
    <dds-pricing-table-header-cell-headline>Variation ${name}</dds-pricing-table-header-cell-headline>
    <dds-pricing-table-header-cell-caption>Starting at $X.XX per user</dds-pricing-table-header-cell-caption>
    <dds-pricing-table-header-cell-tag href="https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/"
      >Merchandising</dds-pricing-table-header-cell-tag
    >
    <dds-pricing-table-header-cell-description>
      Lorem ipsum dolor sit amet consectetur.
      <bx-unordered-list>
        <bx-list-item>Lorem ipsum dolor</bx-list-item>
        <bx-list-item>sit amet</bx-list-item>
        <bx-list-item>consectetur retention adispiscing elit sed do eiusm Eiusmod tempor</bx-list-item>
      </bx-unordered-list>
    </dds-pricing-table-header-cell-description>
    <dds-pricing-table-header-cell-cta href="https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/"
      >Call to action</dds-pricing-table-header-cell-cta
    >
  </dds-pricing-table-header-cell>
`;

const renderHead = (columnCount, heading = '') => {
  return html`
    <dds-pricing-table-head>
      <dds-pricing-table-header-row>
        <dds-pricing-table-header-cell>${heading}</dds-pricing-table-header-cell>
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
};

const renderBodyCell = (type: CELL_TYPES = CELL_TYPES.TEXT) => {
  let content;
  if (type === CELL_TYPES.TEXT) {
    content = html`
      <dds-pricing-table-cell>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum augue.
        Aenean posuere sem vel euismod dignissim.
        <dds-pricing-table-cell-annotation>
          Sed quis neque ultrices, convallis augue non, scelerisque massa.
        </dds-pricing-table-cell-annotation>
      </dds-pricing-table-cell>
    `;
  }

  if (type === CELL_TYPES.ICON) {
    content = html`
      <dds-pricing-table-cell icon="checkmark">
        Cell with icon
        <dds-pricing-table-cell-annotation>
          Sed quis neque ultrices, convallis augue non, scelerisque massa.
        </dds-pricing-table-cell-annotation>
      </dds-pricing-table-cell>
    `;
  }

  if (type === CELL_TYPES.EMPTY) {
    content = html`
      <dds-pricing-table-cell>
        <dds-pricing-table-cell-annotation>
          Sed quis neque ultrices, convallis augue non, scelerisque massa.
        </dds-pricing-table-cell-annotation>
      </dds-pricing-table-cell>
    `;
  }

  return content;
};

const renderBodyRow = (columnCount, rowNum, cellType, rowHeaders = true) => html`
  <dds-pricing-table-row>
    ${(() => {
      const cells: TemplateResult[] = [
        html`
          ${rowHeaders
            ? html`
                <dds-pricing-table-header-cell scope="row">Row ${rowNum}</dds-pricing-table-header-cell>
              `
            : html`
                <dds-pricing-table-cell
                  >Row ${rowNum} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed,
                  aliquet bibendum augue. Aenean posuere sem vel euismod dignissim.</dds-pricing-table-cell
                >
              `}
        `,
      ];
      for (let i = 1; i < columnCount; i++) {
        cells.push(renderBodyCell(cellType));
      }
      return cells;
    })()}
  </dds-pricing-table-row>
`;

export const Default = ({ parameters }) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4, highlightCol, highlightLabel, columnCount, heading } =
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
      ${renderHead(columnCount, heading)}
      <dds-pricing-table-body>
        ${renderBodyRow(columnCount, 1, CELL_TYPES.ICON)} ${renderBodyRow(columnCount, 2, CELL_TYPES.EMPTY)}
        ${renderBodyRow(columnCount, 3, CELL_TYPES.TEXT)}
      </dds-pricing-table-body>
    </dds-pricing-table>
  `;
};

export const WithoutRowHeaders = ({ parameters }) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4, highlightCol, highlightLabel, columnCount, heading } =
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
      ${renderHead(columnCount, heading)}
      <dds-pricing-table-body>
        ${renderBodyRow(columnCount, 1, CELL_TYPES.ICON, false)} ${renderBodyRow(columnCount, 2, CELL_TYPES.EMPTY, false)}
        ${renderBodyRow(columnCount, 3, CELL_TYPES.TEXT, false)}
      </dds-pricing-table-body>
    </dds-pricing-table>
  `;
};

export const WithSubheaders = ({ parameters }) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4, columnCount, highlightCol, highlightLabel, heading } =
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
      ${renderHead(columnCount, heading)}
      <dds-pricing-table-body>
        <dds-pricing-table-group title="Group 1">
          ${renderBodyRow(columnCount, 1, CELL_TYPES.ICON)} ${renderBodyRow(columnCount, 2, CELL_TYPES.EMPTY)}
          ${renderBodyRow(columnCount, 3, CELL_TYPES.TEXT)}
        </dds-pricing-table-group>
        <dds-pricing-table-group title="Group 2">
          ${renderBodyRow(columnCount, 1, CELL_TYPES.ICON)} ${renderBodyRow(columnCount, 2, CELL_TYPES.EMPTY)}
          ${renderBodyRow(columnCount, 3, CELL_TYPES.TEXT)}
        </dds-pricing-table-group>
        <dds-pricing-table-group title="Group 3">
          ${renderBodyRow(columnCount, 1, CELL_TYPES.ICON)} ${renderBodyRow(columnCount, 2, CELL_TYPES.EMPTY)}
          ${renderBodyRow(columnCount, 3, CELL_TYPES.TEXT)}
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
      PricingTable: ({ groupId }) => ({
        heading: text('section heading', 'Optional section heading', groupId),
        columnCount: number('number of columns', 3, { min: 1, max: 8 }, groupId),
        highlightCol: number('highlighted column', 2, { min: 0, max: 8 }, groupId),
        highlightLabel: text('highlighted label', 'Featured', groupId),
        colSpan1: textNullable('col-span-1', '', groupId),
        colSpan2: textNullable('col-span-2', '', groupId),
        colSpan3: textNullable('col-span-3', '', groupId),
        colSpan4: textNullable('col-span-4', '', groupId),
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
