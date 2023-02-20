/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';

const card1 = html`
  <dds-content-group-cards-item href="https://www.example.com">
    <dds-card-heading>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
    </dds-card-heading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <dds-card-footer icon-placement="left">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-footer>
  </dds-content-group-cards-item>
`;

const card2 = html`
  <dds-content-group-cards-item href="https://www.example.com">
    <dds-card-heading>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
    </dds-card-heading>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    <dds-card-footer icon-placement="left">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-footer>
  </dds-content-group-cards-item>
`;

export const Default = ({ parameters }) => {
  const { heading, copy } = parameters?.props?.ContentGroupCards ?? {};
  return html`
    <dds-content-group-cards>
      <dds-content-group-heading>${heading}</dds-content-group-heading>
      <dds-content-group-copy>${copy}</dds-content-group-copy>
      ${card1}${card2}${card1}${card2}
    </dds-content-group-cards>
  `;
};

export default {
  title: 'Components/Content group cards',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-8 bx--no-gutter">
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
      ContentGroupCards: () => ({
        heading: textNullable('Heading (heading):', 'Lorem ipsum dolor sit amet.'),
        copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      }),
    },
    propsSet: {
      default: {
        ContentGroupCards: {
          heading: 'Lorem ipsum dolor sit amet',
          copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
      },
    },
  },
};
