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
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20';
import { TABS_TYPE } from '../defs';
import readme from './README.stories.mdx';
import styles from './tabs-extended-stories.scss';
import { prefix } from '../../../internal/vendor/@carbon/web-components/globals/settings';

const copy = `Lorem ipsum dolor sit amet, *consectetur* adipiscing elit.
  Vivamus sed interdum tortor. Sed id pellentesque diam.
  In ut quam id mauris finibus efficitur quis ut arcu.
  Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem.
  Curabitur pretium elit non blandit lobortis.
  Donec quis pretium odio, in dignissim sapien.`;

export const Default = () => html`
  <style>
    ${styles}
  </style>
  <c4d-tabs-extended value="first">
    <c4d-tab id="tab-first" target="panel-first" value="first">
      First tab with long text
    </c4d-tab>
    <c4d-tab id="tab-second" target="panel-second" value="second">
      Second tab
    </c4d-tab>
    <c4d-tab id="tab-third" target="panel-third" value="third">
      Third tab
    </c4d-tab>
    <c4d-tab id="tab-fourth" target="panel-fourth" value="fourth">
      Fourth tab
    </c4d-tab>
    <c4d-tab label="Fifth tab" disabled>Fifth tab</c4d-tab>
  </c4d-tabs-extended>
  <div class="${prefix}-ce-demo-devenv--tab-panels">
    <div id="panel-first" role="tabpanel" aria-labelledby="tab-first" hidden>
      <c4d-content-item>
        <c4d-content-item-heading>
          Content for first tab goes here.
        </c4d-content-item-heading>
        <c4d-content-item-copy>${copy}</c4d-content-item-copy>
      </c4d-content-item>
    </div>
    <div id="panel-second" role="tabpanel" aria-labelledby="tab-second" hidden>
      <c4d-content-item>
        <c4d-content-item-heading>
          Content for second tab goes here.
        </c4d-content-item-heading>
        <c4d-content-item-copy>${copy}</c4d-content-item-copy>
      </c4d-content-item>
    </div>
    <div id="panel-third" role="tabpanel" aria-labelledby="tab-third" hidden>
      <p>Content for third tab goes here.</p>
    </div>
    <div id="panel-fourth" role="tabpanel" aria-labelledby="tab-fourth" hidden>
      <p>Content for fourth tab goes here.</p>
    </div>
  </div>
`;

export const Contained = () => {
  return html`
    <style>
      ${styles}
    </style>
    <c4d-tabs-extended value="first" type="${TABS_TYPE.CONTAINED}">
      <c4d-tab id="tab-first" target="panel-first" value="first">
        First tab with long text
      </c4d-tab>
      <c4d-tab id="tab-second" target="panel-second" value="second">
        Second tab - min amount for tooltip
      </c4d-tab>
      <c4d-tab id="tab-third" target="panel-third" value="third">
        Third tab
      </c4d-tab>
      <c4d-tab id="tab-fourth" target="panel-fourth" value="fourth">
        Fourth tab
      </c4d-tab>
      <c4d-tab label="Fifth tab" disabled>Fifth tab</c4d-tab>
    </c4d-tabs-extended>
    <div class="${prefix}-ce-demo-devenv--tab-panels">
      <div id="panel-first" role="tabpanel" aria-labelledby="tab-first" hidden>
        <c4d-content-item>
          <c4d-content-item-heading>
            Content for first tab goes here.
          </c4d-content-item-heading>
          <c4d-content-item-copy>${copy}</c4d-content-item-copy>
        </c4d-content-item>

        <c4d-card link slot="footer" href="https://example.com">
          <c4d-card-link-heading>
            Lorem ipsum dolor sit amet
          </c4d-card-link-heading>
          <c4d-card-footer> ${ArrowRight20({ slot: 'icon' })} </c4d-card-footer>
        </c4d-card>
      </div>
      <div
        id="panel-second"
        role="tabpanel"
        aria-labelledby="tab-second"
        hidden>
        <c4d-content-item>
          <c4d-content-item-heading>
            Content for second tab goes here.
          </c4d-content-item-heading>
          <c4d-content-item-copy>${copy}</c4d-content-item-copy>
        </c4d-content-item>
      </div>
      <div id="panel-third" role="tabpanel" aria-labelledby="tab-third" hidden>
        <p>Content for third tab goes here.</p>
      </div>
      <div
        id="panel-fourth"
        role="tabpanel"
        aria-labelledby="tab-fourth"
        hidden>
        <p>Content for fourth tab goes here.</p>
      </div>
    </div>
  `;
};

export default {
  title: 'Components/Tabs extended',
  decorators: [
    (story) => html`
      <div class="${prefix}--grid">
        <div class="${prefix}--row">
          <div class="${prefix}--col-lg-12 ${prefix}--no-gutter">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
