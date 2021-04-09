/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../tabs-extended';
import '../tab';

export const Default = ({ parameters }) => {
  return html`
    <dds-tabs-extended>
      <dds-tab label="First tab">
        <p>Content for first tab goes here.</p>
      </dds-tab>
      <dds-tab label="Second tab">
        <p>Content for second tab goes here.</p>
      </dds-tab>
      <dds-tab label="Third tab" selected="true">
        <p>Content for third tab goes here.</p>
      </dds-tab>
      <dds-tab label="Fourth tab">
        <p>Content for fourth tab goes here.</p>
      </dds-tab>
      <dds-tab label="Fifth tab" disabled="true">
        <p>Content for fifth tab goes here.</p>
      </dds-tab>
    </dds-tabs-extended>
  `;
};

Default.story = {
  parameters: {
    gridContentClasses: 'dds-ce-demo-devenv--simple-grid--tabs-extended',
  },
};

export default {
  title: 'Components/Tabs extended',
  decorators: [
    (story, { parameters }) => html`
      <div class="dds-ce-demo-devenv--simple-grid ${parameters.gridContentClasses}">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasVerticalSpacingInComponent: true,
    hasGrid: true,
    knobs: {},
  },
};
