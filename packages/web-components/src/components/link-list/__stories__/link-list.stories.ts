/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import '../link-list';
import '../link-list-item';
import '../link-list-item-card';
import readme from './README.stories.mdx';

export const Default = () => html`
  <dds-link-list type="default">
    <span slot="heading">Tutorial</span>
    <dds-link-list-item-card href="https://example.com">
      <p>Learn more</p>
      ${ArrowRight20({ slot: 'footer' })}
    </dds-link-list-item-card>
    <dds-link-list-item-card href="https://example.com">
      <p>Containerization A Complete Guide</p>
      ${ArrowRight20({ slot: 'footer' })}
    </dds-link-list-item-card>
  </dds-link-list>
`;

Default.story = {
  parameters: {
    colLgClass: 'bx--col-lg-3',
  },
};

export const Horizontal = () => html`
  <dds-link-list type="horizontal">
    <span slot="heading">Tutorial</span>
    <dds-link-list-item>
      Learn more ${ArrowRight20({ slot: 'icon' })}
    </dds-link-list-item>
    <dds-link-list-item>
      Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
    </dds-link-list-item>
  </dds-link-list>
`;

Horizontal.story = {
  parameters: {
    colLgClass: 'bx--col-lg-10',
  },
};

export const Vertical = () => html`
  <dds-link-list type="vertical">
    <span slot="heading">Tutorial</span>
    <dds-link-list-item>
      Learn more ${ArrowRight20({ slot: 'icon-left' })}
    </dds-link-list-item>
    <dds-link-list-item>
      Containerization A Complete Guide ${ArrowRight20({ slot: 'icon-left' })}
    </dds-link-list-item>
  </dds-link-list>
`;

Vertical.story = {
  parameters: {
    colLgClass: 'bx--col-lg-4',
  },
};

export const VerticalWithCards = () => html`
  <dds-link-list type="vertical">
    <span slot="heading">Tutorial</span>
    <dds-link-list-item>
      Learn more ${ArrowRight20({ slot: 'icon-left' })}
    </dds-link-list-item>
    <dds-link-list-item>
      Containerization A Complete Guide ${ArrowRight20({ slot: 'icon-left' })}
    </dds-link-list-item>
  </dds-link-list>
  <dds-link-list type="default">
    <span slot="heading">Tutorial</span>
    <dds-link-list-item-card href="https://example.com">
      <p>Learn more</p>
      ${ArrowRight20({ slot: 'footer' })}
    </dds-link-list-item-card>
    <dds-link-list-item-card href="https://example.com">
      <p>Containerization A Complete Guide</p>
      ${ArrowRight20({ slot: 'footer' })}
    </dds-link-list-item-card>
  </dds-link-list>
`;

VerticalWithCards.story = {
  parameters: {
    colLgClass: 'bx--col-lg-4',
  },
};

export const EndOfSection = () => html`
  <dds-link-list type="end">
    <span slot="heading">Tutorial</span>
    <dds-link-list-item>
      Learn more ${ArrowRight20({ slot: 'icon' })}
    </dds-link-list-item>
    <dds-link-list-item>
      Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
    </dds-link-list-item>
    <dds-link-list-item>
      Microservices and containers ${ArrowRight20({ slot: 'icon' })}
    </dds-link-list-item>
  </dds-link-list>
`;

EndOfSection.story = {
  parameters: {
    colLgClass: 'bx--col-lg-6',
  },
};

export default {
  title: 'Components/Link List',
  parameters: {
    ...readme.parameters,
    hasGrid: true,
  },
  decorators: [
    (story, { parameters }) => {
      const { colLgClass } = parameters;
      return html`
        <div class="bx--grid dds-ce-demo-devenv--grid--card">
          <div class="bx--row">
            <div class="bx--col-sm-4 ${colLgClass} bx--offset-lg-4">
              ${story()}
            </div>
          </div>
        </div>
      `;
    },
  ],
};
