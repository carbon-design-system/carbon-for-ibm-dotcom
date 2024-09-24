/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20';
import { ifDefined } from 'lit/directives/if-defined.js';
import { optionsKnob } from '@storybook/addon-knobs';
import '../index';
import '../../card-group/index';
import '../../carousel/index';
import '../../content-group-cards/index';
import '../../content-block-simple/index';
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
  <c4d-card href="${ifDefined(href)}">
    <c4d-card-heading>${heading}</c4d-card-heading>
    ${copy}
    <c4d-card-footer> ${ArrowRight20({ slot: 'icon' })} </c4d-card-footer>
  </c4d-card>
`;

export const Default = (args) => {
  const { heading, copy, addChildren } = args?.ContentSection ?? {};
  const classes = addChildren.includes('Content block simple')
    ? 'cds--col-lg-16 cds--no-gutter'
    : '';
  return html`
    <c4d-content-section children-custom-class="${classes}">
      <c4d-content-section-heading
        >${ifDefined(heading)}</c4d-content-section-heading
      >
      <c4d-content-section-copy>${ifDefined(copy)}</c4d-content-section-copy>
      ${addChildren.includes('Content block simple')
        ? html`
            <c4d-content-block-simple>
              <c4d-content-block-heading
                >What’s the latest news in artificial
                intelligence?</c4d-content-block-heading
              >
              <c4d-content-block-copy size="sm"
                >${blockCopy}</c4d-content-block-copy
              >
              <c4d-video-player-container
                slot="media"
                video-id="0_ibuqxqbe"></c4d-video-player-container>
              <c4d-text-cta
                slot="footer"
                cta-type="jump"
                href="https://www.ibm.com"
                >Jump to AI ethics and trust</c4d-text-cta
              >
            </c4d-content-block-simple>
          `
        : ``}
      ${addChildren.includes('Card group')
        ? html`
            <c4d-card-group> ${card1}${card2}${card1}${card2} </c4d-card-group>
          `
        : ``}
      ${addChildren.includes('Link list')
        ? html`
            <c4d-link-list>
              <c4d-link-list-item href="https://example.com">
                Learn more about Kubernetes and automating deployment
                ${ArrowRight20({ slot: 'icon' })}
              </c4d-link-list-item>
              <c4d-link-list-item href="https://example.com">
                Containerization A Complete Guide
                ${ArrowRight20({ slot: 'icon' })}
              </c4d-link-list-item>
              <c4d-link-list-item href="https://example.com">
                Microservices and containers ${ArrowRight20({ slot: 'icon' })}
              </c4d-link-list-item>
              <c4d-link-list-item href="https://example.com">
                Learn more about Kubernetes ${ArrowRight20({ slot: 'icon' })}
              </c4d-link-list-item>
              <c4d-link-list-item href="https://example.com">
                Containerization A Complete Guide
                ${ArrowRight20({ slot: 'icon' })}
              </c4d-link-list-item>
              <c4d-link-list-item href="https://example.com">
                Microservices and containers ${ArrowRight20({ slot: 'icon' })}
              </c4d-link-list-item>
            </c4d-link-list>
          `
        : ``}
      ${addChildren.includes('Carousel')
        ? html`
            <c4d-carousel>
              ${Card()}${Card({ copy: copyOdd })}${Card()}${Card({
                copy: copyOdd,
              })}${Card()}
            </c4d-carousel>
          `
        : ''}
      <c4d-text-cta
        slot="footer"
        cta-type="local"
        href="https://www.example.com"
        >Link action</c4d-text-cta
      >
    </c4d-content-section>
  `;
};

export default {
  title: 'Components/Content section',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-16 cds--no-gutter">
            <c4d-video-container> ${story()} </c4d-video-container>
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
