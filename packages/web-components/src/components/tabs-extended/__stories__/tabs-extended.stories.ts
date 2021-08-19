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
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { select, number } from '@storybook/addon-knobs';
import { ORIENTATION } from '../defs';
import readme from './README.stories.mdx';

const orientationType = {
  [`horizontal`]: ORIENTATION.HORIZONTAL,
  [`Vertical`]: ORIENTATION.VERTICAL,
};

const cardGroupItemWithCardLinks = html`
  <dds-card-group-item href="https://example.com" pattern-background>
    <dds-card-link-heading slot="heading">IBM Developer</dds-card-link-heading>
    <p>Learn, code and connect with your community</p>
    <dds-card-cta-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-cta-footer>
  </dds-card-group-item>
`;

export const Default = ({ parameters }) => {
  const { orientation } = parameters?.props?.TabExtended ?? {};
  return html`
    <dds-tabs-extended orientation="${ifNonNull(orientation)}">
      <dds-tab
        label="First tab with long text that wraps multiple lines. Lorem ipsum dolor sit amet consectetur adipiscing elit"
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

export const withCardGroupCardLinks = ({ parameters }) => {
  const { cards } = parameters?.props?.TabExtended ?? {};
  return html`
    <dds-tabs-extended orientation="vertical">
      <dds-tab label="Tools for developers" selected="true">
        <dds-card-group grid-mode="narrow">
          ${cards}
        </dds-card-group>
      </dds-tab>
      <dds-tab label="Tools for business">
        <p>Content for second tab goes here.</p>
      </dds-tab>
      <dds-tab label="Trending in tech">
        <p>Content for third tab goes here.</p>
      </dds-tab>
    </dds-tabs-extended>
  `;
};

withCardGroupCardLinks.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      TabExtended: ({ groupId }) => ({
        cards: Array.from({
          length: number('Number of cards', 8, {}, groupId),
        }).map(() => cardGroupItemWithCardLinks),
      }),
    },
  },
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
      TabExtended: ({ groupId }) => ({
        orientation: select('Orientation (orientation):', orientationType, ORIENTATION.HORIZONTAL, groupId),
      }),
    },
  },
};
