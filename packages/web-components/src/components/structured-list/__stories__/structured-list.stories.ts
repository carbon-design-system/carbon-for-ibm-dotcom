/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import readme from './README.stories.mdx';
import '../index';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = args => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = args?.StructuredList ?? {};
  return html`
    <dds-structured-list
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}"
    >
      <dds-structured-list-head>
        <dds-structured-list-header-row>
          <dds-structured-list-header-cell>Column A</dds-structured-list-header-cell>
          <dds-structured-list-header-cell>Column B</dds-structured-list-header-cell>
          <dds-structured-list-header-cell>Column C</dds-structured-list-header-cell>
          <dds-structured-list-header-cell>Column D</dds-structured-list-header-cell>
        </dds-structured-list-header-row>
      </dds-structured-list-head>
      <dds-structured-list-body>
        <dds-structured-list-row>
          <dds-structured-list-cell>Row 1</dds-structured-list-cell>
          <dds-structured-list-cell>Row 1</dds-structured-list-cell>
          <dds-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-structured-list-cell>
          <dds-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-structured-list-cell>
        </dds-structured-list-row>
        <dds-structured-list-row>
          <dds-structured-list-cell>Row 2</dds-structured-list-cell>
          <dds-structured-list-cell>Row 2</dds-structured-list-cell>
          <dds-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-structured-list-cell>
          <dds-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-structured-list-cell>
        </dds-structured-list-row>
        <dds-structured-list-row>
          <dds-structured-list-cell>Row 3</dds-structured-list-cell>
          <dds-structured-list-cell>Row 3</dds-structured-list-cell>
          <dds-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-structured-list-cell>
          <dds-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-structured-list-cell>
        </dds-structured-list-row>
      </dds-structured-list-body>
    </dds-structured-list>
  `;
};

export const WithRowHeaders = args => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = args?.StructuredList ?? {};
  return html`
    <dds-structured-list
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}"
    >
      <dds-structured-list-body>
        <dds-structured-list-row>
          <dds-structured-list-header-cell scope="row">Row 1</dds-structured-list-header-cell>
          <dds-structured-list-cell>Row 1</dds-structured-list-cell>
          <dds-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-structured-list-cell>
        </dds-structured-list-row>
        <dds-structured-list-row>
          <dds-structured-list-header-cell scope="row">Row 2</dds-structured-list-header-cell>
          <dds-structured-list-cell>Row 2</dds-structured-list-cell>
          <dds-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-structured-list-cell>
        </dds-structured-list-row>
        <dds-structured-list-row>
          <dds-structured-list-header-cell scope="row">Row 3</dds-structured-list-header-cell>
          <dds-structured-list-cell>Row 3</dds-structured-list-cell>
          <dds-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-structured-list-cell>
        </dds-structured-list-row>
      </dds-structured-list-body>
    </dds-structured-list>
  `;
};

WithRowHeaders.story = {
  name: 'With row headers',
};

export const WithSubheaders = args => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = args?.StructuredList ?? {};
  return html`
    <dds-structured-list
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}"
    >
      <dds-structured-list-body>
        <dds-structured-list-group title="Group 1">
          <dds-structured-list-row>
            <dds-structured-list-header-cell scope="row">Row 1</dds-structured-list-header-cell>
            <dds-structured-list-cell>Row 1</dds-structured-list-cell>
            <dds-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-structured-list-cell>
          </dds-structured-list-row>
          <dds-structured-list-row>
            <dds-structured-list-header-cell scope="row">Row 2</dds-structured-list-header-cell>
            <dds-structured-list-cell>Row 2</dds-structured-list-cell>
            <dds-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-structured-list-cell>
          </dds-structured-list-row>
          <dds-structured-list-row>
            <dds-structured-list-header-cell scope="row">Row 3</dds-structured-list-header-cell>
            <dds-structured-list-cell>Row 3</dds-structured-list-cell>
            <dds-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-structured-list-cell>
          </dds-structured-list-row>
        </dds-structured-list-group>
        <dds-structured-list-group title="Group 2">
          <dds-structured-list-row>
            <dds-structured-list-header-cell scope="row">Row 1</dds-structured-list-header-cell>
            <dds-structured-list-cell>Row 1</dds-structured-list-cell>
            <dds-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-structured-list-cell>
          </dds-structured-list-row>
          <dds-structured-list-row>
            <dds-structured-list-header-cell scope="row">Row 2</dds-structured-list-header-cell>
            <dds-structured-list-cell>Row 2</dds-structured-list-cell>
            <dds-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-structured-list-cell>
          </dds-structured-list-row>
          <dds-structured-list-row>
            <dds-structured-list-header-cell scope="row">Row 3</dds-structured-list-header-cell>
            <dds-structured-list-cell>Row 3</dds-structured-list-cell>
            <dds-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-structured-list-cell>
          </dds-structured-list-row>
        </dds-structured-list-group>
        <dds-structured-list-group title="Group 3">
          <dds-structured-list-row>
            <dds-structured-list-header-cell scope="row">Row 1</dds-structured-list-header-cell>
            <dds-structured-list-cell>Row 1</dds-structured-list-cell>
            <dds-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-structured-list-cell>
          </dds-structured-list-row>
          <dds-structured-list-row>
            <dds-structured-list-header-cell scope="row">Row 2</dds-structured-list-header-cell>
            <dds-structured-list-cell>Row 2</dds-structured-list-cell>
            <dds-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-structured-list-cell>
          </dds-structured-list-row>
          <dds-structured-list-row>
            <dds-structured-list-header-cell scope="row">Row 3</dds-structured-list-header-cell>
            <dds-structured-list-cell>Row 3</dds-structured-list-cell>
            <dds-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-structured-list-cell>
          </dds-structured-list-row>
        </dds-structured-list-group>
      </dds-structured-list-body>
    </dds-structured-list>
  `;
};

WithSubheaders.story = {
  name: 'With subheaders',
};

export const WithComplexContent = args => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = args?.StructuredList ?? {};
  return html`
    <dds-structured-list
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}"
    >
      <dds-structured-list-head>
        <dds-structured-list-header-row>
          <dds-structured-list-header-cell>Product Name</dds-structured-list-header-cell>
        </dds-structured-list-header-row>
      </dds-structured-list-head>
      <dds-structured-list-body>
        <dds-structured-list-row>
          <dds-structured-list-cell tooltip="Tooltip text">
            Cell with tooltip
          </dds-structured-list-cell>
        </dds-structured-list-row>
        <dds-structured-list-row>
          <dds-structured-list-cell icon="checkmark">
            Cell with icon
          </dds-structured-list-cell>
        </dds-structured-list-row>
        <dds-structured-list-row>
          <dds-structured-list-cell tags="Merchandising Offer, Secondary Tag, Other">
            Cell with tags
          </dds-structured-list-cell>
        </dds-structured-list-row>
        <dds-structured-list-row>
          <dds-structured-list-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed,aliquet bibendum augue.
            Aenean posuere sem vel euismod dignissim.
          </dds-structured-list-cell>
        </dds-structured-list-row>
      </dds-structured-list-body>
    </dds-structured-list>
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
