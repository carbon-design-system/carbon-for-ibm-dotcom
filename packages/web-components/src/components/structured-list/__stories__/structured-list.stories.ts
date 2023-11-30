/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import readme from './README.stories.mdx';
import '../index';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = (args) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = args?.StructuredList ?? {};
  return html`
    <style>
      html,
      body {
        overflow-x: hidden;
      }
    </style>
    <c4d-structured-list
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}">
      <c4d-structured-list-head>
        <c4d-structured-list-header-row>
          <c4d-structured-list-header-cell
            >Column A</c4d-structured-list-header-cell
          >
          <c4d-structured-list-header-cell
            >Column B</c4d-structured-list-header-cell
          >
          <c4d-structured-list-header-cell
            >Column C</c4d-structured-list-header-cell
          >
          <c4d-structured-list-header-cell
            >Column D</c4d-structured-list-header-cell
          >
        </c4d-structured-list-header-row>
      </c4d-structured-list-head>
      <c4d-structured-list-body>
        <c4d-structured-list-row>
          <c4d-structured-list-cell>Row 1</c4d-structured-list-cell>
          <c4d-structured-list-cell>Row 1</c4d-structured-list-cell>
          <c4d-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </c4d-structured-list-cell>
          <c4d-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </c4d-structured-list-cell>
        </c4d-structured-list-row>
        <c4d-structured-list-row>
          <c4d-structured-list-cell>Row 2</c4d-structured-list-cell>
          <c4d-structured-list-cell>Row 2</c4d-structured-list-cell>
          <c4d-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </c4d-structured-list-cell>
          <c4d-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </c4d-structured-list-cell>
        </c4d-structured-list-row>
        <c4d-structured-list-row>
          <c4d-structured-list-cell>Row 3</c4d-structured-list-cell>
          <c4d-structured-list-cell>Row 3</c4d-structured-list-cell>
          <c4d-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </c4d-structured-list-cell>
          <c4d-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </c4d-structured-list-cell>
        </c4d-structured-list-row>
      </c4d-structured-list-body>
    </c4d-structured-list>
  `;
};

export const WithRowHeaders = (args) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = args?.StructuredList ?? {};
  return html`
    <c4d-structured-list
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}">
      <c4d-structured-list-body>
        <c4d-structured-list-row>
          <c4d-structured-list-header-cell scope="row"
            >Row 1</c4d-structured-list-header-cell
          >
          <c4d-structured-list-cell>Row 1</c4d-structured-list-cell>
          <c4d-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </c4d-structured-list-cell>
        </c4d-structured-list-row>
        <c4d-structured-list-row>
          <c4d-structured-list-header-cell scope="row"
            >Row 2</c4d-structured-list-header-cell
          >
          <c4d-structured-list-cell>Row 2</c4d-structured-list-cell>
          <c4d-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </c4d-structured-list-cell>
        </c4d-structured-list-row>
        <c4d-structured-list-row>
          <c4d-structured-list-header-cell scope="row"
            >Row 3</c4d-structured-list-header-cell
          >
          <c4d-structured-list-cell>Row 3</c4d-structured-list-cell>
          <c4d-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </c4d-structured-list-cell>
        </c4d-structured-list-row>
      </c4d-structured-list-body>
    </c4d-structured-list>
  `;
};

WithRowHeaders.story = {
  name: 'With row headers',
};

export const WithSubheaders = (args) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = args?.StructuredList ?? {};
  return html`
    <c4d-structured-list
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}">
      <c4d-structured-list-body>
        <c4d-structured-list-group title="Group 1">
          <c4d-structured-list-row>
            <c4d-structured-list-header-cell scope="row"
              >Row 1</c4d-structured-list-header-cell
            >
            <c4d-structured-list-cell>Row 1</c4d-structured-list-cell>
            <c4d-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </c4d-structured-list-cell>
          </c4d-structured-list-row>
          <c4d-structured-list-row>
            <c4d-structured-list-header-cell scope="row"
              >Row 2</c4d-structured-list-header-cell
            >
            <c4d-structured-list-cell>Row 2</c4d-structured-list-cell>
            <c4d-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </c4d-structured-list-cell>
          </c4d-structured-list-row>
          <c4d-structured-list-row>
            <c4d-structured-list-header-cell scope="row"
              >Row 3</c4d-structured-list-header-cell
            >
            <c4d-structured-list-cell>Row 3</c4d-structured-list-cell>
            <c4d-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </c4d-structured-list-cell>
          </c4d-structured-list-row>
        </c4d-structured-list-group>
        <c4d-structured-list-group
          title="Group 2 Lorem ipsum dolor sit amet consectetur, adipiscing elit vestibulum tempus dis, varius dignissim et aliquam.">
          <c4d-structured-list-row>
            <c4d-structured-list-header-cell scope="row"
              >Row 1</c4d-structured-list-header-cell
            >
            <c4d-structured-list-cell>Row 1</c4d-structured-list-cell>
            <c4d-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </c4d-structured-list-cell>
          </c4d-structured-list-row>
          <c4d-structured-list-row>
            <c4d-structured-list-header-cell scope="row"
              >Row 2</c4d-structured-list-header-cell
            >
            <c4d-structured-list-cell>Row 2</c4d-structured-list-cell>
            <c4d-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </c4d-structured-list-cell>
          </c4d-structured-list-row>
          <c4d-structured-list-row>
            <c4d-structured-list-header-cell scope="row"
              >Row 3</c4d-structured-list-header-cell
            >
            <c4d-structured-list-cell>Row 3</c4d-structured-list-cell>
            <c4d-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </c4d-structured-list-cell>
          </c4d-structured-list-row>
        </c4d-structured-list-group>
        <c4d-structured-list-group title="Group 3">
          <c4d-structured-list-row>
            <c4d-structured-list-header-cell scope="row"
              >Row 1</c4d-structured-list-header-cell
            >
            <c4d-structured-list-cell>Row 1</c4d-structured-list-cell>
            <c4d-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </c4d-structured-list-cell>
          </c4d-structured-list-row>
          <c4d-structured-list-row>
            <c4d-structured-list-header-cell scope="row"
              >Row 2</c4d-structured-list-header-cell
            >
            <c4d-structured-list-cell>Row 2</c4d-structured-list-cell>
            <c4d-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </c4d-structured-list-cell>
          </c4d-structured-list-row>
          <c4d-structured-list-row>
            <c4d-structured-list-header-cell scope="row"
              >Row 3</c4d-structured-list-header-cell
            >
            <c4d-structured-list-cell>Row 3</c4d-structured-list-cell>
            <c4d-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
              magna, finibus id tortor sed, aliquet bibendum augue. Aenean
              posuere sem vel euismod dignissim.
            </c4d-structured-list-cell>
          </c4d-structured-list-row>
        </c4d-structured-list-group>
      </c4d-structured-list-body>
    </c4d-structured-list>
  `;
};

WithSubheaders.story = {
  name: 'With subheaders',
};

export const WithComplexContent = (args) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = args?.StructuredList ?? {};
  return html`
    <c4d-structured-list
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}">
      <c4d-structured-list-head>
        <c4d-structured-list-header-row>
          <c4d-structured-list-header-cell
            >Product Name</c4d-structured-list-header-cell
          >
        </c4d-structured-list-header-row>
      </c4d-structured-list-head>
      <c4d-structured-list-body>
        <c4d-structured-list-row>
          <c4d-structured-list-cell tooltip="Tooltip text">
            Cell with tooltip
          </c4d-structured-list-cell>
        </c4d-structured-list-row>
        <c4d-structured-list-row>
          <c4d-structured-list-cell icon="checkmark">
          </c4d-structured-list-cell>
        </c4d-structured-list-row>
        <c4d-structured-list-row>
          <c4d-structured-list-cell
            tags="Merchandising Offer, Secondary Tag, Other">
            Cell with tags
          </c4d-structured-list-cell>
        </c4d-structured-list-row>
        <c4d-structured-list-row>
          <c4d-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed,aliquet bibendum augue. Aenean posuere
            sem vel euismod dignissim.
          </c4d-structured-list-cell>
        </c4d-structured-list-row>
      </c4d-structured-list-body>
    </c4d-structured-list>
  `;
};

WithComplexContent.story = {
  name: 'With complex content',
};

export default {
  title: 'Components/Structured list',
  parameters: {
    ...readme.parameters,
    knobs: {
      StructuredList: () => ({
        colSpan1: textNullable('col-span-1', ''),
        colSpan2: textNullable('col-span-2', ''),
        colSpan3: textNullable('col-span-3', ''),
        colSpan4: textNullable('col-span-4', ''),
      }),
    },
  },
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-16">${story()}</div>
        </div>
      </div>
    `,
  ],
};
