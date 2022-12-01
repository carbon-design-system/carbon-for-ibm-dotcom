/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from '@carbon/carbon-web-components/es/icons/arrow--right/20';
import ifNonNull from '@carbon/carbon-web-components/es/globals/directives/if-non-null.js';
import { optionsKnob } from '@storybook/addon-knobs';
import '../../card-group/index';
import '../../carousel/index';
import '../../content-group-cards/index';
import '../../content-block-simple/index';
import '../index';
import '../../cta/text-cta';
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
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt
    </dds-card-heading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <dds-card-footer icon-placement="left">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-footer>
  </dds-content-group-cards-item>
`;

const card2 = html`
  <dds-content-group-cards-item href="https://www.example.com">
    <dds-card-heading>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt
    </dds-card-heading>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    <dds-card-footer icon-placement="left">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-footer>
  </dds-content-group-cards-item>
`;

const hrefDefault = 'https://www.ibm.com/standards/carbon';
const headingDefault = 'Lorem ipsum dolor sit amet';
const copyDefault =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.';
const copyOdd = `
  ${copyDefault}
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
`;

const Card = ({
  copy = copyDefault,
  heading = headingDefault,
  href = hrefDefault,
} = {}) => html`
  <dds-card href="${ifNonNull(href)}">
    <dds-card-heading>${heading}</dds-card-heading>
    ${copy}
    <dds-card-footer> ${ArrowRight20({ slot: 'icon' })} </dds-card-footer>
  </dds-card>
`;

export const Default = (args) => {
  const { heading, copy, addChildren } = args?.ContentSection ?? {};
  const classes = addChildren.includes('Content block simple')
    ? 'bx--col-lg-16 bx--no-gutter'
    : '';
  return html`
    <dds-content-section children-custom-class="${classes}">
      <dds-content-section-heading
        >${ifNonNull(heading)}</dds-content-section-heading
      >
      <dds-content-section-copy>${ifNonNull(copy)}</dds-content-section-copy>
      ${addChildren.includes('Content block simple')
        ? html`
            <dds-content-block-simple>
              <dds-content-block-heading
                >What’s the latest news in artificial
                intelligence?</dds-content-block-heading
              >
              <dds-content-block-copy size="sm"
                >${blockCopy}</dds-content-block-copy
              >
              <dds-video-player-container
                slot="media"
                video-id="1_9h94wo6b"></dds-video-player-container>
              <dds-text-cta
                slot="footer"
                cta-type="jump"
                href="https://www.ibm.com"
                >Jump to AI ethics and trust</dds-text-cta
              >
            </dds-content-block-simple>
          `
        : ``}
      ${addChildren.includes('Card group')
        ? html`
            <dds-card-group> ${card1}${card2}${card1}${card2} </dds-card-group>
          `
        : ``}
      ${addChildren.includes('Link list')
        ? html`
            <dds-link-list>
              <dds-link-list-item href="https://example.com">
                Learn more about Kubernetes and automating deployment
                ${ArrowRight20({ slot: 'icon' })}
              </dds-link-list-item>
              <dds-link-list-item href="https://example.com">
                Containerization A Complete Guide
                ${ArrowRight20({ slot: 'icon' })}
              </dds-link-list-item>
              <dds-link-list-item href="https://example.com">
                Microservices and containers ${ArrowRight20({ slot: 'icon' })}
              </dds-link-list-item>
              <dds-link-list-item href="https://example.com">
                Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
              </dds-link-list-item>
              <dds-link-list-item href="https://example.com">
                Containerization A Complete Guide
                ${ArrowRight20({ slot: 'icon' })}
              </dds-link-list-item>
              <dds-link-list-item href="https://example.com">
                Microservices and containers ${ArrowRight20({ slot: 'icon' })}
              </dds-link-list-item>
            </dds-link-list>
          `
        : ``}
      ${addChildren.includes('Carousel')
        ? html`
            <dds-carousel>
              ${Card()}${Card({ copy: copyOdd })}${Card()}${Card({
                copy: copyOdd,
              })}${Card()}
            </dds-carousel>
          `
        : ''}
      <dds-text-cta
        slot="footer"
        cta-type="local"
        href="https://www.example.com"
        >Link action</dds-text-cta
      >
    </dds-content-section>
  `;
};

export default {
  title: 'Components/Content section',
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-16 bx--no-gutter">
            <dds-video-container> ${story()} </dds-video-container>
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
        heading: textNullable(
          'Heading:',
          'Speech recognition (statistical Artificial Intelligence)'
        ),
        copy: textNullable(
          'Copy:',
          "AI features for understanding speech can be trained for a specific speaker's voice."
        ),
        addChildren: optionsKnob(
          'Add children:',
          {
            'Content block simple': 'Content block simple',
            'Card group': 'Card group',
            'Link list': 'Link list',
            Carousel: 'Carousel',
          },
          '',
          { display: 'select' }
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
