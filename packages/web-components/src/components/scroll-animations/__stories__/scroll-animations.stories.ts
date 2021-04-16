/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import fadeStyles from '@carbon/ibmdotcom-styles/scss/components/scroll-into-view/_scroll-into-view.scss';
import fadeOptions from './scroll-animations.stories.scss';
import '../scroll-animations';
import readme from './README.stories.mdx';
import StoryContent from '../../dotcom-shell/__stories__/data/content';

const selectorTargets = `dds-content-block-heading,
   dds-content-block-copy,
   dds-video-player-container,
   dds-link-list,
   dds-leadspace-block-cta,
   dds-content-group-heading,
   dds-content-item-copy,
   dds-text-cta,
   dds-feature-card-block-large,
   dds-image,
   .bx--image__img,
   dds-image-with-caption,
   dds-card-cta,
   dds-callout-with-media,
   dds-content-item-horizontal,
   dds-logo-grid-item,
   .bx--card__CTA,
   dds-card-group-item,
   dds-callout-quote,
   dds-video-player,
   dds-cta-section-copy,
   dds-button-group,
   dds-cta-section-item
`;

export const FadeOnce = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <dds-scroll-animations animation="fade" selector-targets="${selectorTargets}">
      ${StoryContent()}
    </dds-scroll-animations>
  `;
};

export const FadeWithContinuousAnimations = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <dds-scroll-animations animation="fade" selector-targets="${selectorTargets}" keep-animation="${true}">
      ${StoryContent()}
    </dds-scroll-animations>
  `;
};

export const SlideUp = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <dds-scroll-animations animation="slide-up" selector-targets="${selectorTargets}" keep-animation="${true}">
      ${StoryContent()}
    </dds-scroll-animations>
  `;
};

export const SlideUpRight = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <dds-scroll-animations animation="slide-up-right" selector-targets="${selectorTargets}" keep-animation="${true}">
      ${StoryContent()}
    </dds-scroll-animations>
  `;
};

export const SlideRight = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <dds-scroll-animations animation="slide-right" selector-targets="${selectorTargets}" keep-animation="${true}">
      ${StoryContent()}
    </dds-scroll-animations>
  `;
};

export const SlideDownRight = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <dds-scroll-animations animation="slide-down-right" selector-targets="${selectorTargets}" keep-animation="${true}">
      ${StoryContent()}
    </dds-scroll-animations>
  `;
};

export const SlideDown = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <dds-scroll-animations animation="slide-down" selector-targets="${selectorTargets}" keep-animation="${true}">
      ${StoryContent()}
    </dds-scroll-animations>
  `;
};

export const SlideDownLeft = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <dds-scroll-animations animation="slide-down-left" selector-targets="${selectorTargets}" keep-animation="${true}">
      ${StoryContent()}
    </dds-scroll-animations>
  `;
};

export const SlideLeft = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <dds-scroll-animations animation="slide-left" selector-targets="${selectorTargets}" keep-animation="${true}">
      ${StoryContent()}
    </dds-scroll-animations>
  `;
};

export const SlideUpLeft = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <dds-scroll-animations animation="slide-up-left" selector-targets="${selectorTargets}" keep-animation="${true}">
      ${StoryContent()}
    </dds-scroll-animations>
  `;
};

export default {
  title: 'Components/Scroll animations',
  parameters: {
    ...readme.parameters,
    useRawContainer: true,
    percy: {
      skip: true,
    },
  },
  decorators: [
    story => html`
      <div class="story--container">
        ${story()}
      </div>
    `,
  ],
};
