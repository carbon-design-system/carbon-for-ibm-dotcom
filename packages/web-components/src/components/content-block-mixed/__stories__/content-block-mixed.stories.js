/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { html } from 'lit-element';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../content-block-mixed';
import '../../content-block/content-block-heading';
import '../../content-block/content-block-paragraph';
import '../../content-group-cards/content-group-cards';
import '../../content-group-cards/content-group-cards-item';
import '../../content-group/content-group-heading';

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
Phasellus at elit sollicitudin, sodales nulla quis, consequat
libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
`;

export default {
  title: 'Components/Content Block Mixed',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    knobs: {
      ContentBlockMixed: ({ groupId }) => ({
        heading: textNullable('Heading (heading)', 'Lorem ipsum dolor sit amet', groupId),
        copy: textNullable('Copy text (copy)', copy, groupId),
        cardsGroupHeading: textNullable(
          'Cards group heading (heading)',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          groupId
        ),
      }),
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, copy: groupCopy, cardsGroupHeading } = parameters?.props?.ContentBlockMixed ?? {};
  return html`
    <dds-content-block-mixed>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-block-paragraph>${groupCopy}</dds-content-block-paragraph>
      <dds-content-group-cards>
        <dds-content-group-heading>${cardsGroupHeading}</dds-content-group-heading>
        <p slot="copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <dds-content-group-cards-item href="www.ibm.com">
          <span slot="heading">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
          <dds-card-footer icon-placement="left">
            ${ArrowRight20({ slot: 'icon' })}
          </dds-card-footer>
        </dds-content-group-cards-item>
        <dds-content-group-cards-item href="www.ibm.com">
          <span slot="heading">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
          <dds-card-footer icon-placement="left">
            ${ArrowRight20({ slot: 'icon' })}
          </dds-card-footer>
        </dds-content-group-cards-item>
      </dds-content-group-cards>
    </dds-content-block-mixed>
  `;
};
