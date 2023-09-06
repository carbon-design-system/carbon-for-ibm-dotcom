/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../index';
import '../../content-block-media/index';
import '../../card-group/index';
import { ifDefined } from 'lit/directives/if-defined.js';
import { select } from '@storybook/addon-knobs';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20';
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

export const Default = (args) => {
  const { orientation } = args?.TabsExtended ?? {};
  return html`
    <c4d-tabs-extended orientation="${ifDefined(orientation)}">
      <c4d-tab
        label="First tab with long text that wraps multiple lines. Lorem ipsum dolor sit amet consectetur adipiscing elit"
        selected>
        <c4d-content-block-media-content>
          <c4d-content-item>
            <c4d-content-item-heading
              >Content for first tab goes here.</c4d-content-item-heading
            >
            <c4d-content-item-copy>${copy}</c4d-content-item-copy>
          </c4d-content-item>

          <c4d-card-link-cta slot="footer" href="https://example.com">
            <c4d-card-link-heading
              >Lorem ipsum dolor sit amet</c4d-card-link-heading
            >
            <c4d-card-cta-footer>
              ${ArrowRight20({ slot: 'icon' })}
            </c4d-card-cta-footer>
          </c4d-card-link-cta>
        </c4d-content-block-media-content>
      </c4d-tab>
      <c4d-tab label="Second tab - min amount for tooltip ">
        <c4d-content-block-media-content>
          <c4d-content-item>
            <c4d-content-item-heading
              >Content for second tab goes here.</c4d-content-item-heading
            >
            <c4d-content-item-copy>${copy}</c4d-content-item-copy>
          </c4d-content-item>
        </c4d-content-block-media-content>
      </c4d-tab>
      <c4d-tab label="Third tab">
        <p>Content for third tab goes here.</p>
      </c4d-tab>
      <c4d-tab label="Fourth tab">
        <p>Content for fourth tab goes here.</p>
      </c4d-tab>
      <c4d-tab label="Fifth tab" disabled>
        <p>Content for fifth tab goes here.</p>
      </c4d-tab>
    </c4d-tabs-extended>
  `;
};

export default {
  title: 'Components/Tabs extended',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-12 cds--no-gutter">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      TabsExtended: () => ({
        orientation: select(
          'Orientation (orientation):',
          orientationType,
          ORIENTATION.HORIZONTAL
        ),
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
