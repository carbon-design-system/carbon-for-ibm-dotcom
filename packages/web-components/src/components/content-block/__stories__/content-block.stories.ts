/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import '../../cta/index';
import '../../card-link/index';
import { html } from 'lit-element';
import { boolean, select } from '@storybook/addon-knobs';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../content-block';
import readme from './README.stories.mdx';

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

  const currentComponents = [
    'Callout quote',
    'Callout with media',
    'Card group',
    'Card in card',
    'Carousel',
    'Content group',
    'Content item row',
    'Content item',
    'Feature card',
    'Image',
    'Link list',
    'Quote',
    'Structured list',
    'Tabs extended',
    'Video player',
  ];

const specContext = require.context('../../', true, /\.stories\.ts$/);

const storyModules = specContext.keys().map(specContext);

const componentStories = {};

storyModules.forEach((e) => {
  const title = (e as any)?.default?.title || '';
  componentStories[title.split('/')[1]] = e;
});

export const Default = (args) => {
  const { heading, copy, showCopy, component, showCTA, border, aside } =
    args?.ContentBlock ?? {};

    const currentStory = componentStories[component];
  
    const storyParameters = currentStory?.default?.parameters;
  
    // // setting default props from propSet

    console.log(currentStory)
    if (!storyParameters?.props) {
      storyParameters.props = storyParameters?.propsSet?.default || {};
    }
  
    const storyArray = [] as any;
  
    // setting up Story array to render all
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(currentStory)) {
      if (value instanceof Function) {
        const defaultObject = (value as any).story?.parameters?.propsSet?.default;
        const defaultPropsKey = defaultObject && Object.keys(defaultObject)[0];
  
        // ensure variant story props save to its own key
        if (defaultPropsKey && (value as any).story) {
          storyParameters.props[defaultPropsKey] = (
            value as any
          ).story?.parameters?.propsSet.default[defaultPropsKey];
        }
  
        // set props from current variant propSet if default props aren't defined
        if (storyParameters?.props) {
          storyParameters.props[key] = (
            value as any
          ).story?.parameters?.propsSet?.default[key];
        }
  
        storyArray.push(value);
      }
    }
  
    const returnStory = storyArray.map((story) => {
  
      return html`
        ${story(storyParameters.props)}
      `;
    });    

  return html`
    <c4d-content-block
      complementary-style-scheme="${border
        ? CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER
        : ''}">
      ${heading
        ? html`
            <c4d-content-block-heading
              >What is the latest news in artificial
              intelligence?</c4d-content-block-heading
            >
          `
        : ''}
      ${showCopy
        ? html` <c4d-content-block-copy>${copy}</c4d-content-block-copy> `
        : ``}
    ${component === 'Card group'
    ? html`
        <c4d-card-group>
            ${card1}${card2}${card1}${card2}${card1}${card2}
        </c4d-card-group>
        `
    : returnStory}        
      ${showCTA
        ? html`
            <c4d-card
              link
              slot="footer"
              cta-type="local"
              href="https://www.example.com">
              <c4d-card-heading
                >Learn more about natual language
                processing</c4d-card-heading
              >
              <c4d-card-footer></c4d-card-footer>
            </c4d-card>
          `
        : ``}
      ${aside
        ? html`
            <c4d-link-list type="default" slot="complementary">
              <c4d-link-list-heading>Tutorials</c4d-link-list-heading>
              <c4d-link-list-item-card href="https://example.com">
                <p>Learn more about Kubernetes</p>
                <c4d-card-footer>
                  ${ArrowRight20({ slot: 'icon' })}
                </c4d-card-footer>
              </c4d-link-list-item-card>
              <c4d-link-list-item-card href="https://example.com">
                <p>Containerization A Complete Guide</p>
                <c4d-card-footer>
                  ${ArrowRight20({ slot: 'icon' })}
                </c4d-card-footer>
              </c4d-link-list-item-card>
            </c4d-link-list>
          `
        : ``}
    </c4d-content-block>
  `;
};

export default {
  title: 'Components/Content block',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-12 cds--no-gutter">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentBlock: () => ({
        heading: boolean('Heading:', true),
        showCopy: boolean('Copy:', true),
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at,' +
          ' molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et' +
          ' magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ' +
          'ligula, vitae finibus ante aliquet a.',

        aside: boolean('Aside:', false),
        component: select('Component:', currentComponents, 'Callout quote'),
        showCTA: boolean('CTA:', true),
        border: boolean('Border:', false),
      }),
    },
    propsSet: {
      default: {
        ContentBlock: {
          heading: true,
          showCopy: true,
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at,' +
            ' molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et' +
            ' magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ' +
            'ligula, vitae finibus ante aliquet a.',
          aside: false,
          addChildren: '',
          showCTA: true,
          border: false,
        },
      },
    },
  },
};