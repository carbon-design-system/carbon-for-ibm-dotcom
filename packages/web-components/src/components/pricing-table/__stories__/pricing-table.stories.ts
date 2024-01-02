/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TemplateResult, html } from 'lit';
import { number, text } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import '../index';
import '../../../internal/vendor/@carbon/web-components/components/tooltip/index.js';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { PRICING_TABLE_HEADER_CELL_TYPES } from '../defs';
import styles from './pricing-table.stories.scss';

enum CELL_TYPES {
  TEXT = 'text',
  ICON = 'icon',
  EMPTY = 'empty',
}

const renderHeaderCell = (iterator: number): TemplateResult => {
  const cellVariations = [
    html`
      <c4d-pricing-table-header-cell>
        <c4d-pricing-table-header-cell-headline
          >Variation ${iterator}</c4d-pricing-table-header-cell-headline
        >
        <c4d-pricing-table-header-cell-caption
          >Starting at $X.XX per user</c4d-pricing-table-header-cell-caption
        >
        <c4d-pricing-table-header-cell-tag
          href="https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/"
          >Merchandising offer</c4d-pricing-table-header-cell-tag
        >
        <c4d-pricing-table-header-cell-description>
          Lorem ipsum dolor sit amet consectetur.
          <cds-unordered-list>
            <cds-list-item>Lorem ipsum dolor</cds-list-item>
            <cds-list-item>sit amet</cds-list-item>
            <cds-list-item
              >consectetur retention adispiscing elit sed do eiusm Eiusmod
              tempor</cds-list-item
            >
          </cds-unordered-list>
        </c4d-pricing-table-header-cell-description>
        <c4d-pricing-table-header-cell-cta
          cta-type="local"
          href="https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/"
          >Call to action</c4d-pricing-table-header-cell-cta
        >
      </c4d-pricing-table-header-cell>
    `,
    html`
      <c4d-pricing-table-header-cell>
        <c4d-pricing-table-header-cell-headline
          >Variation ${iterator}</c4d-pricing-table-header-cell-headline
        >
        <c4d-pricing-table-header-cell-caption
          >Starting at $X.XX per user</c4d-pricing-table-header-cell-caption
        >
        <c4d-pricing-table-header-cell-description>
          Lorem ipsum dolor sit amet consectetur.
          <cds-unordered-list>
            <cds-list-item>Lorem ipsum dolor</cds-list-item>
            <cds-list-item>sit amet</cds-list-item>
            <cds-list-item
              >consectetur retention adispiscing elit sed do eiusm Eiusmod
              tempor</cds-list-item
            >
          </cds-unordered-list>
        </c4d-pricing-table-header-cell-description>
        <c4d-pricing-table-header-cell-cta
          cta-type="local"
          href="https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/"
          >Call to action</c4d-pricing-table-header-cell-cta
        >
      </c4d-pricing-table-header-cell>
    `,
    html`
      <c4d-pricing-table-header-cell>
        <c4d-pricing-table-header-cell-headline
          >Variation ${iterator}</c4d-pricing-table-header-cell-headline
        >
        <c4d-pricing-table-header-cell-caption
          >Starting at $X.XX per user</c4d-pricing-table-header-cell-caption
        >
        <c4d-pricing-table-header-cell-tag
          href="https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/"
          >Secondary tag</c4d-pricing-table-header-cell-tag
        >
        <c4d-pricing-table-header-cell-description>
          Lorem ipsum dolor sit amet consectetur.
          <cds-unordered-list>
            <cds-list-item>Lorem ipsum dolor</cds-list-item>
            <cds-list-item>sit amet</cds-list-item>
            <cds-list-item
              >consectetur retention adispiscing elit sed do eiusm Eiusmod
              tempor</cds-list-item
            >
          </cds-unordered-list>
        </c4d-pricing-table-header-cell-description>
        <c4d-pricing-table-header-cell-cta
          cta-type="local"
          href="https://www.carbondesignsystem.com/all-about-carbon/what-is-carbon/"
          >Call to action</c4d-pricing-table-header-cell-cta
        >
      </c4d-pricing-table-header-cell>
    `,
  ];
  return cellVariations[(iterator - 1) % cellVariations.length];
};

const renderHead = (columnCount: number, heading = ''): TemplateResult => {
  return html`
    <c4d-pricing-table-head>
      <c4d-pricing-table-header-row>
        <c4d-pricing-table-header-cell
          type="${PRICING_TABLE_HEADER_CELL_TYPES.SIMPLE}"
          >${heading}</c4d-pricing-table-header-cell
        >
        ${(() => {
          const cells: TemplateResult[] = [];
          for (let i = 1; i < columnCount; i++) {
            cells.push(renderHeaderCell(i));
          }
          return cells;
        })()}
      </c4d-pricing-table-header-row>
    </c4d-pricing-table-head>
  `;
};

const renderBodyCell = (type: CELL_TYPES, iconText = ''): TemplateResult => {
  switch (type) {
    case CELL_TYPES.TEXT:
      return html`
        <c4d-pricing-table-cell>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
          magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
          sem vel euismod dignissim.
          <c4d-pricing-table-cell-annotation>
            Sed quis neque ultrices, convallis augue non, scelerisque massa.
          </c4d-pricing-table-cell-annotation>
        </c4d-pricing-table-cell>
      `;
    case CELL_TYPES.ICON:
      return html`
        <c4d-pricing-table-cell icon="checkmark">
          ${iconText}
          <c4d-pricing-table-cell-annotation>
            Sed quis neque ultrices, convallis augue non, scelerisque massa.
          </c4d-pricing-table-cell-annotation>
        </c4d-pricing-table-cell>
      `;
    default:
      return html`
        <c4d-pricing-table-cell>
          <c4d-pricing-table-cell-annotation>
            Sed quis neque ultrices, convallis augue non, scelerisque massa.
          </c4d-pricing-table-cell-annotation>
        </c4d-pricing-table-cell>
      `;
  }
};

const renderBodyRow = (
  columnCount: number,
  rowNum: number,
  cellType: CELL_TYPES,
  rowHeaders = true,
  iconText = ''
): TemplateResult => html`
  <c4d-pricing-table-row>
    ${(() => {
      const cells: TemplateResult[] = [
        html`
          ${rowHeaders
            ? html`
                <c4d-pricing-table-header-cell scope="row"
                  >Row ${rowNum}</c4d-pricing-table-header-cell
                >
              `
            : html`
                <c4d-pricing-table-cell
                  >Row ${rowNum} Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nunc dui magna, finibus id tortor sed,
                  aliquet bibendum augue. Aenean posuere sem vel euismod
                  dignissim.</c4d-pricing-table-cell
                >
              `}
        `,
      ];
      for (let i = 1; i < columnCount; i++) {
        cells.push(renderBodyCell(cellType, iconText));
      }
      return cells;
    })()}
  </c4d-pricing-table-row>
`;

export const Default = (args) => {
  const {
    colSpan1,
    colSpan2,
    colSpan3,
    colSpan4,
    highlightCol,
    highlightLabel,
    columnCount,
    heading,
    iconText,
  } = args?.PricingTable ?? {};
  return html`
    <style>
      /* Mimic production styles */
      html,
      body {
        overflow-x: hidden;
        padding-bottom: 250px;
      }
    </style>
    <c4d-pricing-table
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}"
      highlight-column="${highlightCol}"
      highlight-label="${highlightLabel}">
      ${renderHead(columnCount, heading)}
      <c4d-pricing-table-body>
        ${renderBodyRow(columnCount, 1, CELL_TYPES.ICON, true, iconText)}
        ${renderBodyRow(columnCount, 2, CELL_TYPES.EMPTY)}
        ${renderBodyRow(columnCount, 3, CELL_TYPES.TEXT)}
      </c4d-pricing-table-body>
    </c4d-pricing-table>
  `;
};

export const WithoutRowHeaders = (args) => {
  const {
    colSpan1,
    colSpan2,
    colSpan3,
    colSpan4,
    highlightCol,
    highlightLabel,
    columnCount,
    heading,
    iconText,
  } = args?.PricingTable ?? {};
  return html`
    <c4d-pricing-table
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}"
      highlight-column="${highlightCol}"
      highlight-label="${highlightLabel}">
      ${renderHead(columnCount, heading)}
      <c4d-pricing-table-body>
        ${renderBodyRow(columnCount, 1, CELL_TYPES.ICON, false, iconText)}
        ${renderBodyRow(columnCount, 2, CELL_TYPES.EMPTY, false)}
        ${renderBodyRow(columnCount, 3, CELL_TYPES.TEXT, false)}
      </c4d-pricing-table-body>
    </c4d-pricing-table>
  `;
};
if (WithoutRowHeaders) {
  // @ts-ignore
  WithoutRowHeaders.story = {
    name: 'Without row headers',
  };
}

export const WithSubheaders = (args) => {
  const {
    colSpan1,
    colSpan2,
    colSpan3,
    colSpan4,
    columnCount,
    highlightCol,
    highlightLabel,
    heading,
    iconText,
  } = args?.PricingTable ?? {};
  return html`
    <c4d-pricing-table
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}"
      highlight-column="${highlightCol}"
      highlight-label="${highlightLabel}">
      ${renderHead(columnCount, heading)}
      <c4d-pricing-table-body>
        <c4d-pricing-table-group title="Group 1">
          ${renderBodyRow(columnCount, 1, CELL_TYPES.ICON, true, iconText)}
          ${renderBodyRow(columnCount, 2, CELL_TYPES.EMPTY)}
          ${renderBodyRow(columnCount, 3, CELL_TYPES.TEXT)}
        </c4d-pricing-table-group>
        <c4d-pricing-table-group title="Group 2">
          ${renderBodyRow(columnCount, 1, CELL_TYPES.ICON, true, iconText)}
          ${renderBodyRow(columnCount, 2, CELL_TYPES.EMPTY)}
          ${renderBodyRow(columnCount, 3, CELL_TYPES.TEXT)}
        </c4d-pricing-table-group>
        <c4d-pricing-table-group title="Group 3">
          ${renderBodyRow(columnCount, 1, CELL_TYPES.ICON, true, iconText)}
          ${renderBodyRow(columnCount, 2, CELL_TYPES.EMPTY)}
          ${renderBodyRow(columnCount, 3, CELL_TYPES.TEXT)}
        </c4d-pricing-table-group>
      </c4d-pricing-table-body>
    </c4d-pricing-table>
  `;
};
if (WithSubheaders) {
  // @ts-ignore
  WithSubheaders.story = {
    name: 'With subheaders',
  };
}

export default {
  title: 'Experimental/Pricing Table',
  parameters: {
    ...readme.parameters,
    percy: {
      skip: true,
    },
    knobs: {
      PricingTable: () => ({
        heading: text('section heading', 'Optional section heading'),
        columnCount: number('number of columns', 3, { min: 1, max: 8 }),
        highlightCol: number('highlighted column', 2, { min: 0, max: 8 }),
        highlightLabel: text('highlighted label', 'Featured'),
        colSpan1: textNullable('col-span-1', ''),
        colSpan2: textNullable('col-span-2', ''),
        colSpan3: textNullable('col-span-3', ''),
        colSpan4: textNullable('col-span-4', ''),
        iconText: textNullable('icon-text', ''),
      }),
    },
  },
  propsSet: {
    default: {
      PricingTable: {
        heading: 'Optional section heading',
        columnCount: 3,
        highlightCol: 2,
        highlightLabel: 'Featured',
        colSpan1: '',
        colSpan2: '',
        colSpan3: '',
        colSpan4: '',
      },
    },
  },
  decorators: [
    (story) => html`
      <style>
        ${styles}
      </style>
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-16">${story()}</div>
        </div>
      </div>
    `,
  ],
};
