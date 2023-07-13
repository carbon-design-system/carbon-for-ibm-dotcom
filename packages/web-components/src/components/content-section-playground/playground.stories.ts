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
// import styles from './playground.stories.scss';

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
    <dds-content-section children-custom-class=${childrenCustomClass}>
      <dds-content-section-heading>Heading</dds-content-section-heading>
      ${component === 'Card group'
        ? html`
            <dds-card-group>
              ${card1}${card2}${card1}${card2}${card1}${card2}
            </dds-card-group>
          `
        : ``}
      ${returnStory}
    </dds-content-section>
  `;
};

export const MultipleContentSections = () => {
  return html`
    <dds-content-section>
      <dds-content-section-heading>Heading</dds-content-section-heading>
      <dds-card-group>
        ${card1}${card2}${card1}${card2}${card1}${card2}
      </dds-card-group>
    </dds-content-section>

    <dds-content-section>
      <dds-content-section-heading>Heading</dds-content-section-heading>
      <dds-card-group>
        ${card1}${card2}${card1}${card2}${card1}${card2}
      </dds-card-group>
      <dds-content-block-segmented>
        <dds-content-block-heading>heading</dds-content-block-heading>
        <dds-content-block-copy>copy</dds-content-block-copy>
        <dds-image
          slot="media"
          alt="Image alt text"
          default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
          heading="Mauris iaculis eget dolor nec hendrerit.">
        </dds-image>
        <dds-content-block-segmented-item>
          <dds-content-group-heading
            >Lorem ipsum dolor sit amet.</dds-content-group-heading
          >
          <dds-content-item-copy
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
            sapien.</dds-content-item-copy
          >
          <dds-text-cta
            slot="footer"
            cta-type="local"
            icon-placement="right"
            href="https://example.com"
            >Lorem Ipsum dolor sit</dds-text-cta
          >
        </dds-content-block-segmented-item>
        <dds-content-block-segmented-item>
          <dds-content-group-heading
            >Lorem ipsum dolor sit amet.</dds-content-group-heading
          >
          <dds-content-item-copy
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
            sapien.</dds-content-item-copy
          >
          <dds-image
            slot="media"
            alt="Image alt text"
            default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
            heading="Mauris iaculis eget dolor nec hendrerit.">
          </dds-image>
          <dds-text-cta
            slot="footer"
            cta-type="local"
            icon-placement="right"
            href="https://example.com"
            >Lorem Ipsum dolor sit</dds-text-cta
          >
        </dds-content-block-segmented-item>
        <dds-card-link-cta
          slot="footer"
          cta-type="local"
          href="https://example.com">
          <dds-card-link-heading>Lorem ipsum dolor</dds-card-link-heading>
          <dds-card-cta-footer></dds-card-cta-footer>
        </dds-card-link-cta>
      </dds-content-block-segmented>
    </dds-content-section>

    <dds-content-section>
      <dds-content-section-heading>Heading</dds-content-section-heading>
      <dds-image
        alt="Image alt text"
        default-src="${imgLg16x9}"
        heading="Mauris iaculis eget dolor nec hendrerit.">
        <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}">
        </dds-image-item>
        <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}">
        </dds-image-item>
        <dds-image-item media="(min-width: 320px)" srcset="${imgSm16x9}">
        </dds-image-item>
      </dds-image>
      <dds-content-item>
        <dds-content-item-heading>Heading</dds-content-item-heading>
        <dds-content-item-copy>Copy</dds-content-item-copy>
        <dds-text-cta
          slot="footer"
          cta-type="local"
          href="https://www.example.com">
          CTA text</dds-text-cta
        >
      </dds-content-item>

      <dds-feature-card href="https://example.com">
        <dds-image
          slot="image"
          alt="Image alt text"
          default-src="${imgLg16x9}"></dds-image>
        <dds-card-heading>Heading</dds-card-heading>
        <dds-feature-card-footer>
          ${ArrowRight20({ slot: 'icon' })}
        </dds-feature-card-footer>
      </dds-feature-card>
    </dds-content-section>
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
    <dds-content-section children-custom-class=${childrenCustomClass}>
      <dds-content-section-heading>Heading</dds-content-section-heading>
      <dds-card-group>
        ${card1}${card2}${card1}${card2}${card1}${card2}
      </dds-card-group>
      ${storyHtml.map((e) => e)}
    </dds-content-section>
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
