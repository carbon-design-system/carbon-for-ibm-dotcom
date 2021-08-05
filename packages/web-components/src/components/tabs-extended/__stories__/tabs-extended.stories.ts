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
import { select } from '@storybook/addon-knobs';
import { ORIENTATION } from '../defs';
import readme from './README.stories.mdx';

const orientationType = {
  [`horizontal`]: ORIENTATION.HORIZONTAL,
  [`Vertical`]: ORIENTATION.VERTICAL,
};

const defaultCardGroupItem = html`
  <dds-card-group-item href="https://example.com">
    <dds-card-eyebrow>Label</dds-card-eyebrow>
    <dds-card-heading>The United Nations Environment Program works with IBM to reduce marine litter</dds-card-heading>
    <dds-card-cta-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-cta-footer>
  </dds-card-group-item>
`;

export const Default = ({ parameters }) => {
  const { orientation, cards } = parameters?.props?.['dds-tabs-extended'] ?? {};
  return html`
    <dds-tabs-extended orientation="${ifNonNull(orientation)}">
      <dds-tab label="Tools for developers" selected="true">
        ${orientation === ORIENTATION.VERTICAL
          ? html`
              <dds-card-group>${cards}</dds-card-group>
            `
          : html`
              <p>Content for first tab goes here.</p>
            `}
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
      <div class="bx--grid">
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
        cards: Array.from({
          length: 8,
        }).map(() => defaultCardGroupItem),
      }),
    },
  },
};
