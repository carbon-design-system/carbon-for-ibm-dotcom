/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';

const card1 = html`
  <c4d-content-group-cards-item href="https://www.example.com">
    <c4d-card-heading>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt
    </c4d-card-heading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <c4d-card-footer icon-placement="left">
      ${ArrowRight20({ slot: 'icon' })}
    </c4d-card-footer>
  </c4d-content-group-cards-item>
`;

const card2 = html`
  <c4d-content-group-cards-item href="https://www.example.com">
    <c4d-card-heading>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt
    </c4d-card-heading>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    <c4d-card-footer icon-placement="left">
      ${ArrowRight20({ slot: 'icon' })}
    </c4d-card-footer>
  </c4d-content-group-cards-item>
`;

export const Default = (args) => {
  const { heading, copy } = args?.ContentGroupCards ?? {};
  return html`
    <c4d-content-group-cards>
      <c4d-content-group-heading>${heading}</c4d-content-group-heading>
      <c4d-content-group-copy>${copy}</c4d-content-group-copy>
      ${card1}${card2}${card1}${card2}
    </c4d-content-group-cards>
  `;
};

export default {
  title: 'Components/Content group cards',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-8 cds--no-gutter">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentGroupCards: () => ({
        heading: textNullable(
          'Heading (heading):',
          'Lorem ipsum dolor sit amet.'
        ),
        copy: textNullable(
          'Copy (copy):',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        ),
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
