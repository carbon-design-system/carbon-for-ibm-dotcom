/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, css } from 'lit-element';
import ArrowRight20 from 'carbon-custom-elements/es/icons/arrow--right/20';
import '../link-list';
import '../link-list-item';
import '../../card-link/card-link';
import '../../link-with-icon/link-with-icon';
// import readme from './README.stories.mdx';

const styles = css`
  .bx--grid {
    width: 100%;
  }
`;

export const Default = () => {
  return html`
    <style>
      ${styles}
    </style>
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col-sm-4 bx--col-lg-3 bx--offset-lg-4">
          <dds-link-list type="default">
            <span slot="heading">Tutorial</span>
            <dds-link-list-item>
              <dds-card-link href="https://example.com">
                Learn more ${ArrowRight20({ slot: 'footer' })}
              </dds-card-link>
            </dds-link-list-item>
            <dds-link-list-item>
              <dds-card-link href="https://example.com">
                Containerization A Complete Guide ${ArrowRight20({ slot: 'footer' })}
              </dds-card-link>
            </dds-link-list-item>
          </dds-link-list>
        </div>
      </div>
    </div>
  `;
};

export const Horizontal = () => {
  return html`
    <style>
      ${styles}
    </style>
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col-sm-4 bx--col-lg-10 bx--offset-lg-4">
          <dds-link-list type="horizontal">
            <span slot="heading">Tutorial</span>
            <dds-link-list-item>
              <dds-link-with-icon>
                Learn more ${ArrowRight20({ slot: 'icon' })}
              </dds-link-with-icon>
            </dds-link-list-item>
            <dds-link-list-item>
              <dds-link-with-icon>
                Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
              </dds-link-with-icon>
            </dds-link-list-item>
          </dds-link-list>
        </div>
      </div>
    </div>
  `;
};

export const Vertical = () => {
  return html`
    <style>
      ${styles}
    </style>
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col-sm-4 bx--col-lg-4 bx--offset-lg-4">
          <dds-link-list type="vertical">
            <span slot="heading">Tutorial</span>
            <dds-link-list-item>
              <dds-link-with-icon>
                Learn more ${ArrowRight20({ slot: 'icon-left' })}
              </dds-link-with-icon>
            </dds-link-list-item>
            <dds-link-list-item>
              <dds-link-with-icon>
                Containerization A Complete Guide ${ArrowRight20({ slot: 'icon-left' })}
              </dds-link-with-icon>
            </dds-link-list-item>
          </dds-link-list>
        </div>
      </div>
    </div>
  `;
};

export const VerticalWithCards = () => {
  return html`
    <style>
      ${styles}
    </style>
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col-sm-4 bx--col-lg-4 bx--offset-lg-4">
          <dds-link-list type="vertical">
            <span slot="heading">Tutorial</span>
            <dds-link-list-item>
              <dds-link-with-icon>
                Learn more ${ArrowRight20({ slot: 'icon-left' })}
              </dds-link-with-icon>
            </dds-link-list-item>
            <dds-link-list-item>
              <dds-link-with-icon>
                Containerization A Complete Guide ${ArrowRight20({ slot: 'icon-left' })}
              </dds-link-with-icon>
            </dds-link-list-item>
          </dds-link-list>
          <dds-link-list type="default">
            <span slot="heading">Tutorial</span>
            <dds-link-list-item>
              <dds-card-link href="https://example.com">
                Learn more ${ArrowRight20({ slot: 'footer' })}
              </dds-card-link>
            </dds-link-list-item>
            <dds-link-list-item>
              <dds-card-link href="https://example.com">
                Containerization A Complete Guide ${ArrowRight20({ slot: 'footer' })}
              </dds-card-link>
            </dds-link-list-item>
          </dds-link-list>
        </div>
      </div>
    </div>
  `;
};

export const EndOfSection = () => {
  return html`
    <style>
      ${styles}
    </style>
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col-sm-4 bx--col-lg-4 bx--offset-lg-4">
          <dds-link-list type="end">
            <span slot="heading">Tutorial</span>
            <dds-link-list-item>
              <dds-link-with-icon>
                Learn more ${ArrowRight20({ slot: 'icon' })}
              </dds-link-with-icon>
            </dds-link-list-item>
            <dds-link-list-item>
              <dds-link-with-icon>
                Containerization A Complete Guide ${ArrowRight20({ slot: 'icon' })}
              </dds-link-with-icon>
            </dds-link-list-item>
            <dds-link-list-item>
              <dds-link-with-icon>
                Microservices and containers ${ArrowRight20({ slot: 'icon' })}
              </dds-link-with-icon>
            </dds-link-list-item>
          </dds-link-list>
        </div>
      </div>
    </div>
  `;
};

export default {
  title: 'Components/Link List',
  parameters: {
    // ...readme.parameters,
    // knobs: {
    //   'dds-link-list/default': ({ groupId }) => ({
    //     children: textNullable('Link text (unnamed slot)', 'Link text', groupId),
    //     disabled: boolean('Disabled (disabled)', false, groupId),
    //     href: textNullable('Link href (href)', 'https://github.com/carbon-design-system/carbon-custom-elements', groupId),
    //     onClick: action('click'),
    //   }),
    // },
  },
};
