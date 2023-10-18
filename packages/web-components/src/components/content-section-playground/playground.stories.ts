/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { select, text } from '@storybook/addon-knobs';
import ArrowRight20 from '../../internal/vendor/@carbon/web-components/icons/arrow--right/20';
import imgLg16x9 from '../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import imgMd16x9 from '../../../../storybook-images/assets/480/fpo--16x9--480x270--005.jpg';
import imgSm16x9 from '../../../../storybook-images/assets/320/fpo--16x9--320x180--005.jpg';

const currentComponents = [
  'Callout quote',
  'Callout with media',
  'Card group',
  'Card in card',
  'Carousel',
  'Content block',
  'Content group',
  'Content item horizontal',
  'Content item',
  'CTA block',
  'Feature card',
  'Image',
  'Lightbox media viewer',
  'Link list',
  'Logo grid',
  'Notice Choice',
  'Pictogram item',
  'Quote',
  'Structured list',
  'Tabs extended',
  'Tabs extended - with media',
  'Tag group',
  'Video player',
];
const kitchenSinkComponents = [
  'Callout quote',
  'Callout with media',
  'Card group',
  'Card in card',
  'Carousel',
  'Content block',
  'Content group',
  'Content item horizontal',
  'Content item',
  'CTA block',
  'Feature card',
  'Image',
  'Link list',
  'Logo grid',
  'Notice Choice',
  'Pictogram item',
  'Quote',
  'Structured list',
  'Tabs extended',
  'Tabs extended - with media',
  'Tag group',
  'Video player',
];

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

const specContext = require.context('../../', true, /\.stories\.ts$/);

const storyModules = specContext.keys().map(specContext);

const componentStories = {};

storyModules.forEach((e) => {
  const title = (e as any)?.default?.title || '';
  componentStories[title.split('/')[1]] = e;
});

export const Default = (args) => {
  const { component, childrenCustomClass } = args?.Playground ?? {};
  const currentStory = componentStories[component];

  const storyParameters = currentStory?.default?.parameters;

  // // setting default props from propSet
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
    const variationTitle =
      story?.story?.name ||
      Object.keys(story?.story?.parameters?.knobs || {})[0];

    return html`
      ${variationTitle || 'Default'} ${story(storyParameters.props)}
    `;
  });

  return html`
    <c4d-content-section children-custom-class=${childrenCustomClass}>
      <c4d-content-section-heading>Heading</c4d-content-section-heading>
      ${component === 'Card group'
        ? html`
            <c4d-card-group>
              ${card1}${card2}${card1}${card2}${card1}${card2}
            </c4d-card-group>
          `
        : ``}
      ${returnStory}
    </c4d-content-section>
  `;
};

export const SpacingTest = () => {
  return html`
    <c4d-content-section>
      <c4d-content-section-heading>Heading</c4d-content-section-heading>
      <c4d-card-group>
        ${card1}${card2}${card1}${card2}${card1}${card2}
      </c4d-card-group>
    </c4d-content-section>

    <c4d-content-section>
      <c4d-content-section-heading>Heading</c4d-content-section-heading>
      <c4d-content-block>
        <c4d-content-block-heading>This is an example heading</c4d-content-block-heading>
        <c4d-content-block-copy>With an example copy this is really long and it keeps going so that the copy looks more realistic</c4d-content-block-copy>
        <c4d-card-group>
          ${card1}${card2}${card1}${card2}${card1}${card2}
        </c4d-card-group>
      </c4d-content-block>
      <c4d-cta
      slot="cta"
      cta-type="local"
      cta-style="card"
      href="https://example.com">
      <c4d-card-heading>Lorem ipsum dolor</c4d-card-heading>
      <c4d-card-footer></c4d-card-footer>
    </c4d-cta>
    </c4d-content-section>    

    <c4d-content-section>
      <c4d-content-section-heading>Heading</c4d-content-section-heading>
      <c4d-content-block>
        <c4d-content-block-heading>This is an example heading</c4d-content-block-heading>
        <c4d-content-block-copy>With an example copy this is really long and it keeps going so that the copy looks more realistic</c4d-content-block-copy>
        <c4d-image
          slot="media"
          alt="Image alt text"
          default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
          heading="Mauris iaculis eget dolor nec hendrerit.">
        </c4d-image>
        
        <c4d-card-link-cta
          slot="footer"
          cta-type="local"
          href="https://example.com">
          <c4d-card-link-heading>Lorem ipsum dolor</c4d-card-link-heading>
          <c4d-card-cta-footer></c4d-card-cta-footer>
        </c4d-card-link-cta>
      </c4d-content-block>
    </c4d-content-section>

    <c4d-content-section>
      <c4d-content-section-heading>Heading</c4d-content-section-heading>
      <c4d-image
        alt="Image alt text"
        default-src="${imgLg16x9}"
        heading="Mauris iaculis eget dolor nec hendrerit.">
        <c4d-image-item media="(min-width: 672px)" srcset="${imgLg16x9}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 400px)" srcset="${imgMd16x9}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 320px)" srcset="${imgSm16x9}">
        </c4d-image-item>
      </c4d-image>
      <c4d-content-item>
        <c4d-content-item-heading>Heading</c4d-content-item-heading>
        <c4d-content-item-copy>Copy</c4d-content-item-copy>
        <c4d-text-cta
          slot="footer"
          cta-type="local"
          href="https://www.example.com">
          CTA text</c4d-text-cta
        >
      </c4d-content-item>

      <c4d-feature-card href="https://example.com">
        <c4d-image
          slot="image"
          alt="Image alt text"
          default-src="${imgLg16x9}"></c4d-image>
        <c4d-card-heading>Heading</c4d-card-heading>
        <c4d-feature-card-footer>
          ${ArrowRight20({ slot: 'icon' })}
        </c4d-feature-card-footer>
      </c4d-feature-card>
    </c4d-content-section>
  `;
};

export const MultipleContentSections = () => {
  return html`
    <c4d-content-section>
      <c4d-content-section-heading>Heading</c4d-content-section-heading>
      <c4d-card-group>
        ${card1}${card2}${card1}${card2}${card1}${card2}
      </c4d-card-group>
    </c4d-content-section>

    <c4d-content-section>
      <c4d-content-section-heading>Heading</c4d-content-section-heading>
      <c4d-card-group>
        ${card1}${card2}${card1}${card2}${card1}${card2}
      </c4d-card-group>
      <c4d-content-block-segmented>
        <c4d-content-block-heading>heading</c4d-content-block-heading>
        <c4d-content-block-copy>copy</c4d-content-block-copy>
        <c4d-image
          slot="media"
          alt="Image alt text"
          default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
          heading="Mauris iaculis eget dolor nec hendrerit.">
        </c4d-image>
        <c4d-content-block-segmented-item>
          <c4d-content-group-heading
            >Lorem ipsum dolor sit amet.</c4d-content-group-heading
          >
          <c4d-content-item-copy
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris
            finibus efficitur quis ut arcu. Praesent purus turpis, venenatis
            eget odio et, tincidunt bibendum sem. Curabitur pretium elit non
            blandit lobortis. Donec quis pretium odio, in dignissim sapien.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed
            interdum tortor. Sed id pellentesque diam. In ut quam id mauris
            finibus efficitur quis ut arcu. Praesent purus turpis, venenatis
            eget odio et, tincidunt bibendum sem. Curabitur pretium elit non
            blandit lobortis. Donec quis pretium odio, in dignissim
            sapien.</c4d-content-item-copy
          >
          <c4d-text-cta
            slot="footer"
            cta-type="local"
            icon-placement="right"
            href="https://example.com"
            >Lorem Ipsum dolor sit</c4d-text-cta
          >
        </c4d-content-block-segmented-item>
        <c4d-content-block-segmented-item>
          <c4d-content-group-heading
            >Lorem ipsum dolor sit amet.</c4d-content-group-heading
          >
          <c4d-content-item-copy
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris
            finibus efficitur quis ut arcu. Praesent purus turpis, venenatis
            eget odio et, tincidunt bibendum sem. Curabitur pretium elit non
            blandit lobortis. Donec quis pretium odio, in dignissim sapien.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed
            interdum tortor. Sed id pellentesque diam. In ut quam id mauris
            finibus efficitur quis ut arcu. Praesent purus turpis, venenatis
            eget odio et, tincidunt bibendum sem. Curabitur pretium elit non
            blandit lobortis. Donec quis pretium odio, in dignissim
            sapien.</c4d-content-item-copy
          >
          <c4d-image
            slot="media"
            alt="Image alt text"
            default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
            heading="Mauris iaculis eget dolor nec hendrerit.">
          </c4d-image>
          <c4d-text-cta
            slot="footer"
            cta-type="local"
            icon-placement="right"
            href="https://example.com"
            >Lorem Ipsum dolor sit</c4d-text-cta
          >
        </c4d-content-block-segmented-item>
        <c4d-card-link-cta
          slot="footer"
          cta-type="local"
          href="https://example.com">
          <c4d-card-link-heading>Lorem ipsum dolor</c4d-card-link-heading>
          <c4d-card-cta-footer></c4d-card-cta-footer>
        </c4d-card-link-cta>
      </c4d-content-block-segmented>
    </c4d-content-section>

    <c4d-content-section>
      <c4d-content-section-heading>Heading</c4d-content-section-heading>
      <c4d-image
        alt="Image alt text"
        default-src="${imgLg16x9}"
        heading="Mauris iaculis eget dolor nec hendrerit.">
        <c4d-image-item media="(min-width: 672px)" srcset="${imgLg16x9}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 400px)" srcset="${imgMd16x9}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 320px)" srcset="${imgSm16x9}">
        </c4d-image-item>
      </c4d-image>
      <c4d-content-item>
        <c4d-content-item-heading>Heading</c4d-content-item-heading>
        <c4d-content-item-copy>Copy</c4d-content-item-copy>
        <c4d-text-cta
          slot="footer"
          cta-type="local"
          href="https://www.example.com">
          CTA text</c4d-text-cta
        >
      </c4d-content-item>

      <c4d-feature-card href="https://example.com">
        <c4d-image
          slot="image"
          alt="Image alt text"
          default-src="${imgLg16x9}"></c4d-image>
        <c4d-card-heading>Heading</c4d-card-heading>
        <c4d-feature-card-footer>
          ${ArrowRight20({ slot: 'icon' })}
        </c4d-feature-card-footer>
      </c4d-feature-card>
    </c4d-content-section>
  `;
};

export const KitchenSink = (args) => {
  const { childrenCustomClass } = args?.Playground ?? {};

  const storyMappings = {};

  kitchenSinkComponents.forEach((component) => {
    const currentStory = componentStories[component] as any;

    const storyParameters = currentStory?.default?.parameters;

    // // setting default props from propSet
    if (!storyParameters?.props) {
      storyParameters.props = storyParameters?.propsSet?.default || {};
    }

    const storyArray = [] as any;

    // setting up Story array to render all
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(currentStory)) {
      if (value instanceof Function) {
        const defaultObject = (value as any).story?.parameters?.propsSet
          ?.default;
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
    storyMappings[component] = storyArray;
  });

  const storyHtml = [] as any;

  for (const [key, value] of Object.entries(storyMappings)) {
    const storyParameters = componentStories[key]?.default?.parameters;
    const returnStory = (value as any).map((story) => {
      return html` ${story(storyParameters.props)} `;
    });

    storyHtml.push(returnStory);
  }

  return html`
    <c4d-content-section children-custom-class=${childrenCustomClass}>
      <c4d-content-section-heading>Heading</c4d-content-section-heading>
      <c4d-card-group>
        ${card1}${card2}${card1}${card2}${card1}${card2}
      </c4d-card-group>
      ${storyHtml.map((e) => e)}
    </c4d-content-section>
  `;
};

KitchenSink.story = {
  parameters: {
    knobs: {
      Playground: () => ({
        childrenCustomClass: text('Custom class:', ''),
      }),
    },
  },
};

export default {
  title: 'Components/Content section playground',
  decorators: [(story) => html` ${story()} `],
  parameters: {
    hasStoryPadding: true,
    knobs: {
      Playground: () => ({
        childrenCustomClass: text('Custom class:', ''),
        component: select('Component:', currentComponents, 'Callout quote'),
      }),
    },
  },
};