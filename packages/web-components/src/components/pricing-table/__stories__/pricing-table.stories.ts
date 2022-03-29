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
import 'carbon-web-components/es/components/tooltip/index';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = parameters?.props?.PricingTable ?? {};
  return html`
    <dds-pricing-table
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}"
    >
      <dds-pricing-table-headline>
        <dds-pricing-table-headline-heading>Optional heading</dds-pricing-table-headline-heading>
        <dds-content-section>
          <dds-content-section-heading>Content section heading</dds-content-section-heading>
          <dds-content-section-copy>I am the headline, short and stout.</dds-content-section-copy>
          <dds-text-cta slot="footer" cta-type="local" href="https://www.example.com">Link action</dds-text-cta>
        </dds-content-section>
      </dds-pricing-table-headline>
      <dds-pricing-table-head>
        <dds-pricing-table-header-row>
          <dds-pricing-table-header-cell>Column A</dds-pricing-table-header-cell>
          <dds-pricing-table-header-cell>Column B</dds-pricing-table-header-cell>
          <dds-pricing-table-header-cell>Column C</dds-pricing-table-header-cell>
          <dds-pricing-table-header-cell>Column D</dds-pricing-table-header-cell>
        </dds-pricing-table-header-row>
      </dds-pricing-table-head>
      <dds-pricing-table-body>
        <dds-pricing-table-row>
          <dds-pricing-table-cell>Row 1</dds-pricing-table-cell>
          <dds-pricing-table-cell>Row 1</dds-pricing-table-cell>
          <dds-pricing-table-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-pricing-table-cell>
          <dds-pricing-table-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-pricing-table-cell>
        </dds-pricing-table-row>
        <dds-pricing-table-row>
          <dds-pricing-table-cell>Row 2</dds-pricing-table-cell>
          <dds-pricing-table-cell>Row 2</dds-pricing-table-cell>
          <dds-pricing-table-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-pricing-table-cell>
          <dds-pricing-table-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-pricing-table-cell>
        </dds-pricing-table-row>
        <dds-pricing-table-row>
          <dds-pricing-table-cell>Row 3</dds-pricing-table-cell>
          <dds-pricing-table-cell>Row 3</dds-pricing-table-cell>
          <dds-pricing-table-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-pricing-table-cell>
          <dds-pricing-table-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-pricing-table-cell>
        </dds-pricing-table-row>
      </dds-pricing-table-body>
    </dds-pricing-table>
  `;
};

export const WithRowHeaders = ({ parameters }) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = parameters?.props?.PricingTable ?? {};
  return html`
    <dds-pricing-table
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}"
    >
      <dds-pricing-table-body>
        <dds-pricing-table-row>
          <dds-pricing-table-header-cell scope="row">Row 1</dds-pricing-table-header-cell>
          <dds-pricing-table-cell>Row 1</dds-pricing-table-cell>
          <dds-pricing-table-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-pricing-table-cell>
        </dds-pricing-table-row>
        <dds-pricing-table-row>
          <dds-pricing-table-header-cell scope="row">Row 2</dds-pricing-table-header-cell>
          <dds-pricing-table-cell>Row 2</dds-pricing-table-cell>
          <dds-pricing-table-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-pricing-table-cell>
        </dds-pricing-table-row>
        <dds-pricing-table-row>
          <dds-pricing-table-header-cell scope="row">Row 3</dds-pricing-table-header-cell>
          <dds-pricing-table-cell>Row 3</dds-pricing-table-cell>
          <dds-pricing-table-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
            augue. Aenean posuere sem vel euismod dignissim.
          </dds-pricing-table-cell>
        </dds-pricing-table-row>
      </dds-pricing-table-body>
    </dds-pricing-table>
  `;
};

export const WithSubheaders = ({ parameters }) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = parameters?.props?.PricingTable ?? {};
  return html`
    <dds-pricing-table
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}"
    >
      <dds-pricing-table-body>
        <dds-pricing-table-group title="Group 1">
          <dds-pricing-table-row>
            <dds-pricing-table-header-cell scope="row">Row 1</dds-pricing-table-header-cell>
            <dds-pricing-table-cell>Row 1</dds-pricing-table-cell>
            <dds-pricing-table-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-pricing-table-cell>
          </dds-pricing-table-row>
          <dds-pricing-table-row>
            <dds-pricing-table-header-cell scope="row">Row 2</dds-pricing-table-header-cell>
            <dds-pricing-table-cell>Row 2</dds-pricing-table-cell>
            <dds-pricing-table-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-pricing-table-cell>
          </dds-pricing-table-row>
          <dds-pricing-table-row>
            <dds-pricing-table-header-cell scope="row">Row 3</dds-pricing-table-header-cell>
            <dds-pricing-table-cell>Row 3</dds-pricing-table-cell>
            <dds-pricing-table-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-pricing-table-cell>
          </dds-pricing-table-row>
        </dds-pricing-table-group>
        <dds-pricing-table-group title="Group 2">
          <dds-pricing-table-row>
            <dds-pricing-table-header-cell scope="row">Row 1</dds-pricing-table-header-cell>
            <dds-pricing-table-cell>Row 1</dds-pricing-table-cell>
            <dds-pricing-table-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-pricing-table-cell>
          </dds-pricing-table-row>
          <dds-pricing-table-row>
            <dds-pricing-table-header-cell scope="row">Row 2</dds-pricing-table-header-cell>
            <dds-pricing-table-cell>Row 2</dds-pricing-table-cell>
            <dds-pricing-table-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-pricing-table-cell>
          </dds-pricing-table-row>
          <dds-pricing-table-row>
            <dds-pricing-table-header-cell scope="row">Row 3</dds-pricing-table-header-cell>
            <dds-pricing-table-cell>Row 3</dds-pricing-table-cell>
            <dds-pricing-table-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-pricing-table-cell>
          </dds-pricing-table-row>
        </dds-pricing-table-group>
        <dds-pricing-table-group title="Group 3">
          <dds-pricing-table-row>
            <dds-pricing-table-header-cell scope="row">Row 1</dds-pricing-table-header-cell>
            <dds-pricing-table-cell>Row 1</dds-pricing-table-cell>
            <dds-pricing-table-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-pricing-table-cell>
          </dds-pricing-table-row>
          <dds-pricing-table-row>
            <dds-pricing-table-header-cell scope="row">Row 2</dds-pricing-table-header-cell>
            <dds-pricing-table-cell>Row 2</dds-pricing-table-cell>
            <dds-pricing-table-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-pricing-table-cell>
          </dds-pricing-table-row>
          <dds-pricing-table-row>
            <dds-pricing-table-header-cell scope="row">Row 3</dds-pricing-table-header-cell>
            <dds-pricing-table-cell>Row 3</dds-pricing-table-cell>
            <dds-pricing-table-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </dds-pricing-table-cell>
          </dds-pricing-table-row>
        </dds-pricing-table-group>
      </dds-pricing-table-body>
    </dds-pricing-table>
  `;
};

export const WithComplexContent = ({ parameters }) => {
  const { colSpan1, colSpan2, colSpan3, colSpan4 } = parameters?.props?.PricingTable ?? {};
  return html`
    <dds-pricing-table
      col-span-1="${colSpan1 ?? ''}"
      col-span-2="${colSpan2 ?? ''}"
      col-span-3="${colSpan3 ?? ''}"
      col-span-4="${colSpan4 ?? ''}"
    >
      <dds-pricing-table-head>
        <dds-pricing-table-header-row>
          <dds-pricing-table-header-cell>Product Name</dds-pricing-table-header-cell>
        </dds-pricing-table-header-row>
      </dds-pricing-table-head>
      <dds-pricing-table-body>
        <dds-pricing-table-row>
          <dds-pricing-table-cell tooltip="Tooltip text">
            Cell with tooltip
          </dds-pricing-table-cell>
        </dds-pricing-table-row>
        <dds-pricing-table-row>
          <dds-pricing-table-cell icon="checkmark">
            Cell with icon
          </dds-pricing-table-cell>
        </dds-pricing-table-row>
        <dds-pricing-table-row>
          <dds-pricing-table-cell tags="Merchandising Offer, Secondary Tag, Other">
            Cell with tags
          </dds-pricing-table-cell>
        </dds-pricing-table-row>
        <dds-pricing-table-row>
          <dds-pricing-table-cell>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed,aliquet bibendum augue.
            Aenean posuere sem vel euismod dignissim.
          </dds-pricing-table-cell>
        </dds-pricing-table-row>
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
