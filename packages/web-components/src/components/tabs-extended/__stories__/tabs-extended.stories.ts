/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../index';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import { ORIENTATION } from '../defs';
import readme from './README.stories.mdx';

const orientationType = {
  [`horizontal`]: ORIENTATION.HORIZONTAL,
  [`Vertical`]: ORIENTATION.VERTICAL,
};

export const Default = ({ parameters }) => {
  const { orientation } = parameters?.props?.['dds-tabs-extended'] ?? {};
  return html`
    <dds-tabs-extended orientation="${ifNonNull(orientation)}">
      <dds-tab
        label="First tab with long text that wraps multiple lines. Lorem ipsum dolor sit amet, consectetur."
        selected="true"
      >
        <p>Content for first tab goes here.</p>
      </dds-tab>
      <dds-tab label="Second tab">
        <p>Content for second tab goes here.</p>
      </dds-tab>
      <dds-tab label="Third tab">
        <p>Content for third tab goes here.</p>
      </dds-tab>
      <dds-tab label="Fourth tab">
        <p>Content for fourth tab goes here.</p>
      </dds-tab>
      <dds-tab label="Fifth tab (disabled)" disabled="true">
        <p>Content for fifth tab goes here.</p>
      </dds-tab>
    </dds-tabs-extended>
  `;
};

export default {
  title: 'Components/Tabs extended',
  decorators: [
    story => html`
      <div class="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--tabs-extended">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    useRawContainer: true,
    hasGrid: true,
    knobs: {
      'dds-tabs-extended': ({ groupId }) => ({
        orientation: select('Orientation (orientation):', orientationType, ORIENTATION.HORIZONTAL, groupId),
      }),
    },
  },
};
