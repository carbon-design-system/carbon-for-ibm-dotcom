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
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { optionsKnob } from '@storybook/addon-knobs';
import '../index';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

/* eslint-disable max-len */
const blockCopy = `Simply: when a technology gives a machine any ability that mimics human thought processes, we call it “artificial intelligence” (or AI).

Human fascination with thinking machines has been with us as long as machines themselves. In every generation, new technologies perform tasks that we previously believed were only possible for humans. Our curiosity drives us to make technology always do more, and better.

And here's an intriguing paradox: over time, as our assumptions shift about what machines can and can't do, we also gradually change our assessment of what counts as “genuine” intelligence. So what we call “artificial intelligence” keeps changing, too.

For example: optical scan of documents (to create a text file out of an image of text) used to be considered artificial intelligence before it became common in our everyday lives. Observers of the history of AI call this phenomenon "the AI effect."
`;

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
  const { heading, copy, addChildren } = parameters?.props?.ContentSection ?? {};
  return html`
    <dds-content-section children-custom-class="bx--col-lg-8 bx--no-gutter">
      <dds-content-section-heading>${ifNonNull(heading)}</dds-content-section-heading>
      <dds-content-section-copy>${ifNonNull(copy)}</dds-content-section-copy>
      ${addChildren.includes('Content block simple')
        ? html`
            <dds-content-block-simple>
              <dds-content-block-heading>What’s the latest news in artificial intelligence?</dds-content-block-heading>
              <dds-content-block-copy size="sm">${blockCopy}</dds-content-block-copy>
              <dds-video-player-container slot="media" video-id="1_9h94wo6b"></dds-video-player-container>
              <dds-text-cta slot="footer" cta-type="jump" href="https://www.ibm.com">Jump to AI ethics and trust</dds-text-cta>
            </dds-content-block-simple>
          `
        : ``}
      ${addChildren.includes('Content group cards')
        ? html`
            <dds-content-group-cards>
              <dds-content-group-heading>Lorem ipsum dolor sit amet.</dds-content-group-heading>
              <dds-content-group-copy>Lorem ipsum dolor sit amet.</dds-content-group-copy>
              ${card1}${card2}${card1}${card2}
            </dds-content-group-cards>
          `
        : ``}
      <dds-text-cta slot="footer" cta-type="local" href="https://www.example.com">Link action</dds-text-cta>
    </dds-content-section>
  `;
};

export default {
  title: 'Components/Content section',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-16 bx--no-gutter">
            <dds-video-container>
              ${story()}
            </dds-video-container>
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      escapeHTML: false,
      ContentSection: () => ({
        heading: textNullable('Heading:', 'Speech recognition (statistical Artificial Intelligence)'),
        copy: textNullable('Copy:', "AI features for understanding speech can be trained for a specific speaker's voice."),
        addChildren: optionsKnob(
          'Add children:',
          {
            'Content block simple': 'Content block simple',
            'Content group cards': 'Content group cards',
          },
          '',
          { display: 'multi-select' }
        ),
      }),
    },
    propsSet: {
      default: {
        ContentSection: {
          heading: 'Speech recognition (statistical Artificial Intelligence)',
          copy: "AI features for understanding speech can be trained for a specific speaker's voice.",
          addChildren: '',
        },
      },
    },
  },
};
