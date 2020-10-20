/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../logo-grid';
import '../../content-block/content-block-heading';
import '../logo-grid-item';
import textNullable from '../../../../.storybook/knob-text-nullable';

// import readme from './README.stories.mdx';

export const Default = ({ parameters }) => {
  return html`
    <dds-logo-grid>
      <dds-content-block-heading>
        Our customers
      </dds-content-block-heading>
      <dds-logo-grid-item href="https://example.com" default-src="https://dummyimage.com/288x216/ee5396/161616&text=1:1" alt=""></dds-logo-grid-item>
      <dds-logo-grid-item href="https://example.com" default-src="https://dummyimage.com/288x216/ee5396/161616&text=1:1" alt=""></dds-logo-grid-item>
      <dds-logo-grid-item href="https://example.com" default-src="https://dummyimage.com/288x216/ee5396/161616&text=1:1" alt=""></dds-logo-grid-item>
      <dds-logo-grid-item href="https://example.com" default-src="https://dummyimage.com/288x216/ee5396/161616&text=1:1" alt=""></dds-logo-grid-item>
      <dds-logo-grid-item href="https://example.com" default-src="https://dummyimage.com/288x216/ee5396/161616&text=1:1" alt=""></dds-logo-grid-item>
      <dds-logo-grid-item href="https://example.com" default-src="https://dummyimage.com/288x216/ee5396/161616&text=1:1" alt=""></dds-logo-grid-item>
      <dds-logo-grid-item href="https://example.com" default-src="https://dummyimage.com/288x216/ee5396/161616&text=1:1" alt=""></dds-logo-grid-item>
      <dds-logo-grid-item href="https://example.com" default-src="https://dummyimage.com/288x216/ee5396/161616&text=1:1" alt=""></dds-logo-grid-item>
      <dds-logo-grid-item href="https://example.com" default-src="https://dummyimage.com/288x216/ee5396/161616&text=1:1" alt=""></dds-logo-grid-item>
    </dds-logo-grid>
  `;
};

export default {
  title: 'Components/Logo Grid',
  decorators: [
    story => html`
      <div style="width: 100%" class="bx--grid dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row">
          <div class="bx--col-lg-8 bx--offset-lg-2">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    // ...readme.parameters,
    knobs: {
      LogoGrid: ({ groupId }) => ({
      }),
    },
  },
};
