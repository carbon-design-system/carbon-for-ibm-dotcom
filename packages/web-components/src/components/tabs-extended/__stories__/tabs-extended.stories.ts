/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../index';
import '../../card-group/index';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { ORIENTATION } from '../defs';
import readme from './README.stories.mdx';

const orientationType = {
  [`horizontal`]: ORIENTATION.HORIZONTAL,
  [`vertical`]: ORIENTATION.VERTICAL,
};

const copy = `Lorem ipsum dolor sit amet, *consectetur* adipiscing elit.
  Vivamus sed interdum tortor. Sed id pellentesque diam.
  In ut quam id mauris finibus efficitur quis ut arcu.
  Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem.
  Curabitur pretium elit non blandit lobortis.
  Donec quis pretium odio, in dignissim sapien.`;

export const Default = args => {
  const { orientation } = args?.TabsExtended ?? {};
  return html`
    <dds-tabs-extended orientation="${ifNonNull(orientation)}">
      <dds-tab
        label="First tab with long text that wraps multiple lines. Lorem ipsum dolor sit amet consectetur adipiscing elit"
        selected
      >
        <dds-content-block-media-content>
          <dds-content-item>
            <dds-content-item-heading>Content for first tab goes here.</dds-content-item-heading>
            <dds-content-item-copy>${copy}</dds-content-item-copy>
          </dds-content-item>

          <dds-card-link-cta slot="footer" href="https://example.com">
            <dds-card-link-heading>Lorem ipsum dolor sit amet</dds-card-link-heading>
            <dds-card-cta-footer>
              ${ArrowRight20({ slot: 'icon' })}
            </dds-card-cta-footer>
          </dds-card-link-cta>
        </dds-content-block-media-content>
      </dds-tab>
      <dds-tab label="Second tab - min amount for tooltip ">
        <dds-content-block-media-content>
          <dds-content-item>
            <dds-content-item-heading>Content for second tab goes here.</dds-content-item-heading>
            <dds-content-item-copy>${copy}</dds-content-item-copy>
          </dds-content-item>
        </dds-content-block-media-content>
      </dds-tab>
      <dds-tab label="Third tab">
        <p>Content for third tab goes here.</p>
      </dds-tab>
      <dds-tab label="Fourth tab">
        <p>Content for fourth tab goes here.</p>
      </dds-tab>
      <dds-tab label="Fifth tab" disabled>
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
        <div class="bx--row">
          <div class="bx--col-lg-12 bx--no-gutter">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      TabsExtended: () => ({
        orientation: select('Orientation (orientation):', orientationType, ORIENTATION.HORIZONTAL),
      }),
    },
    propsSet: {
      default: {
        TabsExtended: {
          orientation: 'horizontal',
        },
      },
    },
  },
};
