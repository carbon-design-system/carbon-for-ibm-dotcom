/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import './structured-list';
import './structured-list-head';
import './structured-list-header-row';
import './structured-list-header-cell';
import './structured-list-body';
import './structured-list-row';
import './structured-list-cell';
import './structured-list-header-cell-skeleton';
import storyDocs from './structured-list-story.mdx';
import { prefix } from '../../globals/settings';

export const Default = (args) => {
  const { hasSelection } = args?.[`${prefix}-structured-list`] ?? {};
  const selectionName = !hasSelection ? undefined : 'structured-list-selection';
  const selectionValues = !hasSelection
    ? []
    : [
        'structured-list-selection-0',
        'structured-list-selection-1',
        'structured-list-selection-2',
      ];
  return html`
    <cds-structured-list selection-name=${ifDefined(selectionName)}>
      <cds-structured-list-head>
        <cds-structured-list-header-row>
          <cds-structured-list-header-cell>
            ColumnA
          </cds-structured-list-header-cell>
          <cds-structured-list-header-cell>
            ColumnB
          </cds-structured-list-header-cell>
          <cds-structured-list-header-cell>
            ColumnC
          </cds-structured-list-header-cell>
      </cds-structured-list-head>
      <cds-structured-list-body>
        <cds-structured-list-row
          selection-value=${ifDefined(selectionValues[0])}>
          <cds-structured-list-cell>Row 1</cds-structured-list-cell>
          <cds-structured-list-cell>Row 1</cds-structured-list-cell>
          <cds-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque
            vulputate nisl a porttitor interdum.</cds-structured-list-cell>
        </cds-structured-list-row>
        <cds-structured-list-row
          selection-value=${ifDefined(selectionValues[1])}>
          <cds-structured-list-cell>Row 2</cds-structured-list-cell>
          <cds-structured-list-cell>Row 2</cds-structured-list-cell>
          <cds-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque
            vulputate nisl a porttitor interdum.</cds-structured-list-cell>
        </cds-structured-list-row>
      </cds-structured-list-body>
    </cds-structured-list>
  `;
};

export const Selection = () => {
  const selectionName = 'structured-list-selection';
  const selectionValues = [
    'structured-list-selection-0',
    'structured-list-selection-1',
    'structured-list-selection-2',
    'structured-list-selection-3',
  ];
  return html`
    <cds-structured-list selection-name=${ifDefined(selectionName)}>
      <cds-structured-list-head>
        <cds-structured-list-header-row>
          <cds-structured-list-header-cell>
            ColumnA
          </cds-structured-list-header-cell>
          <cds-structured-list-header-cell>
            ColumnB
          </cds-structured-list-header-cell>
          <cds-structured-list-header-cell>
            ColumnC
          </cds-structured-list-header-cell>
        </cds-structured-list-header-row>
      </cds-structured-list-head>
      <cds-structured-list-body>
        ${selectionValues.map(
          (selectionValue, index) => html` <cds-structured-list-row
            selection-value=${ifDefined(selectionValue)}>
            <cds-structured-list-cell>Row ${index}</cds-structured-list-cell>
            <cds-structured-list-cell>Row ${index}</cds-structured-list-cell>
            <cds-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim. Nulla ut cursus dolor.
              Pellentesque vulputate nisl a porttitor
              interdum.</cds-structured-list-cell
            >
          </cds-structured-list-row>`
        )}
      </cds-structured-list-body>
    </cds-structured-list>
  `;
};

export const Playground = (args) => {
  const { condensed, flush, hasSelection } =
    args?.[`${prefix}-structured-list`] ?? {};
  const selectionName = !hasSelection ? undefined : 'structured-list-selection';
  const selectionValues = !hasSelection
    ? []
    : [
        'structured-list-selection-0',
        'structured-list-selection-1',
        'structured-list-selection-2',
      ];
  return html`
    <cds-structured-list
    selection-name=${ifDefined(selectionName)}
    ?condensed=${condensed}
    ?flush=${flush}>
      <cds-structured-list-head>
        <cds-structured-list-header-row>
          <cds-structured-list-header-cell>
            ColumnA
          </cds-structured-list-header-cell>
          <cds-structured-list-header-cell>
            ColumnB
          </cds-structured-list-header-cell>
          <cds-structured-list-header-cell>
            ColumnC
          </cds-structured-list-header-cell>
      </cds-structured-list-head>
      <cds-structured-list-body>
        <cds-structured-list-row
          selection-value=${ifDefined(selectionValues[0])}>
          <cds-structured-list-cell>Row 1</cds-structured-list-cell>
          <cds-structured-list-cell>Row 1</cds-structured-list-cell>
          <cds-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque
            vulputate nisl a porttitor interdum.</cds-structured-list-cell>
        </cds-structured-list-row>
        <cds-structured-list-row
          selection-value=${ifDefined(selectionValues[1])}>
          <cds-structured-list-cell>Row 2</cds-structured-list-cell>
          <cds-structured-list-cell>Row 2</cds-structured-list-cell>
          <cds-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim. Nulla ut cursus dolor. Pellentesque
            vulputate nisl a porttitor interdum.</cds-structured-list-cell>
        </cds-structured-list-row>
      </cds-structured-list-body>
    </cds-structured-list>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-structured-list`]: () => ({
      condensed: boolean('Condensed (condensed)', false),
      flush: boolean('Flush (flush)', false),
      hasSelection: boolean(
        'Supports selection feature (has-selection)',
        false
      ),
    }),
  },
};

export const skeleton = () => html`
  <div style="width:800px">
    ${Array.apply(null, Array(2)).map(
      () => html`
        <cds-structured-list>
          <cds-structured-list-head>
            <cds-structured-list-header-row>
              ${Array.apply(null, Array(3)).map(
                () => html`
                  <cds-structured-list-header-cell-skeleton>
                  </cds-structured-list-header-cell-skeleton>
                `
              )}
            </cds-structured-list-header-row>
          </cds-structured-list-head>
          <cds-structured-list-body>
            ${Array.apply(null, Array(5)).map(
              () => html`<cds-structured-list-row>
                <cds-structured-list-cell></cds-structured-list-cell>
                <cds-structured-list-cell></cds-structured-list-cell>
                <cds-structured-list-cell></cds-structured-list-cell>
              </cds-structured-list-row>`
            )}
          </cds-structured-list-body>
        </cds-structured-list>
      `
    )}
  </div>
`;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Components/Structured list',
  parameters: {
    ...storyDocs.parameters,
  },
};
