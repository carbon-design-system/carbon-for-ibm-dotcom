/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import Info16 from 'carbon-web-components/es/icons/information/16';
import readme from './README.stories.mdx';
import '../index';
import 'carbon-web-components/es/components/tooltip/index';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { copy } = parameters?.props?.StructuredList ?? {};
  return html`
    <dds-structured-list>
      <dds-structured-list-head>
        <dds-structured-list-header-row>
          <dds-structured-list-header-cell>Column A</dds-structured-list-header-cell>
          <dds-structured-list-header-cell>Column B</dds-structured-list-header-cell>
          <dds-structured-list-header-cell>Column C</dds-structured-list-header-cell>
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
        </dds-structured-list-row>
        <dds-structured-list-row>
          <dds-structured-list-cell>Row 2</dds-structured-list-cell>
          <dds-structured-list-cell>Row 2</dds-structured-list-cell>
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
        </dds-structured-list-row>
      </dds-structured-list-body>
    </dds-structured-list>
  `;
};

export const WithRowHeaders = ({ parameters }) => {
  const { copy } = parameters?.props?.StructuredList ?? {};
  return html`
    <dds-structured-list>
      <dds-structured-list-head>
        <dds-structured-list-header-row>
          <dds-structured-list-header-cell></dds-structured-list-header-cell>
          <dds-structured-list-header-cell>Column A</dds-structured-list-header-cell>
          <dds-structured-list-header-cell>Column B</dds-structured-list-header-cell>
        </dds-structured-list-header-row>
      </dds-structured-list-head>
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

export const WithSubheaders = ({ parameters }) => {
  const { copy } = parameters?.props?.StructuredList ?? {};
  return html`
    <dds-structured-list>
      <dds-structured-list-head>
        <dds-structured-list-header-row>
          <dds-structured-list-header-cell></dds-structured-list-header-cell>
          <dds-structured-list-header-cell>Column A</dds-structured-list-header-cell>
          <dds-structured-list-header-cell>Column B</dds-structured-list-header-cell>
        </dds-structured-list-header-row>
      </dds-structured-list-head>
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

export const WithComplexContent = ({ parameters }) => {
  const { copy } = parameters?.props?.StructuredList ?? {};
  return html`
    <dds-structured-list>
      <dds-structured-list-head>
        <dds-structured-list-header-row>
          <dds-structured-list-header-cell></dds-structured-list-header-cell>
          <dds-structured-list-header-cell>Column A</dds-structured-list-header-cell>
          <dds-structured-list-header-cell>Column B</dds-structured-list-header-cell>
        </dds-structured-list-header-row>
      </dds-structured-list-head>
      <dds-structured-list-body>

        <dds-structured-list-row>
          <dds-structured-list-header-cell scope="row">Row 1</dds-structured-list-header-cell>
          <dds-structured-list-cell>
            Row 1
            <bx-tooltip-icon alignment="start" body-text="Tooltip for row 1" direction="right">
              ${Info16()}
            </bx-tooltip-icon>
          </dds-structured-list-cell>
          <dds-structured-list-cell>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </p>
            <dds-tag-link type="green" href="https://example.com">Tag One</dds-tag-link>
            <dds-tag-link type="green" href="https://example.com">Tag Two</dds-tag-link>
          </dds-structured-list-cell>
        </dds-structured-list-row>

      </dds-structured-list-body>
    </dds-structured-list>
  `;
};

export default {
  title: 'Components/Structured List',
  parameters: {
    ...readme.parameters,
    knobs: {
      StructuredList: () => ({
        copy: textNullable('Copy', 'Hello world!'),
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
