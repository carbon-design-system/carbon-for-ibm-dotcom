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
import '../content-group-cards';
import '../content-group-cards-item';
import '../../card/card-heading';
import '../../content-group/content-group-copy';
import '../../content-group/content-group-heading';

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
  title: 'Components/Content Group Cards',
  decorators: [
    story => html`
      <div class="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--content-layout">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      ContentGroupCards: () => ({
        heading: textNullable('Heading (heading):', 'Lorem ipsum dolor sit amet.'),
        copy: textNullable('Copy (copy):', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
      }),
    },
  },
};
