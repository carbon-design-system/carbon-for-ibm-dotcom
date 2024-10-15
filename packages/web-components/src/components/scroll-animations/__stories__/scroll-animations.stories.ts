/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import fadeStyles from '@carbon/ibmdotcom-styles/scss/components/scroll-into-view/_index.scss?lit';
import fadeOptions from './scroll-animations.stories.scss?lit';
import '../scroll-animations';
import readme from './README.stories.mdx';
import { StoryContent } from '../../dotcom-shell/__stories__/data/content';

const selectorTargets = `c4d-content-block-heading,
   c4d-content-block-copy,
   c4d-video-player-container,
   c4d-link-list,
   c4d-leadspace-block-cta,
   c4d-content-group-heading,
   c4d-content-item-copy,
   c4d-text-cta,
   c4d-image,
   .cds--image__img,
   c4d-image,
   c4d-card-cta,
   c4d-callout-with-media,
   c4d-content-item-row,
   c4d-logo-grid-item,
   .cds--card__CTA,
   c4d-card-group-item,
   c4d-callout-quote,
   c4d-video-player,
   c4d-cta-section-copy,
   c4d-button-group,
   c4d-cta-section-item
`;

export const FadeOnce = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <c4d-scroll-animations
      animation="fade"
      selector-targets="${selectorTargets}">
      ${StoryContent()}
    </c4d-scroll-animations>
  `;
};

FadeOnce.story = {
  name: 'Fade once',
};

export const FadeWithContinuousAnimations = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <c4d-scroll-animations
      animation="fade"
      selector-targets="${selectorTargets}"
      keep-animation="${true}">
      ${StoryContent()}
    </c4d-scroll-animations>
  `;
};

FadeWithContinuousAnimations.story = {
  name: 'Fade with continuous animations',
};

export const SlideUp = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <c4d-scroll-animations
      animation="slide-up"
      selector-targets="${selectorTargets}"
      keep-animation="${true}">
      ${StoryContent()}
    </c4d-scroll-animations>
  `;
};

SlideUp.story = {
  name: 'Slide up',
};

export const SlideUpRight = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <c4d-scroll-animations
      animation="slide-up-right"
      selector-targets="${selectorTargets}"
      keep-animation="${true}">
      ${StoryContent()}
    </c4d-scroll-animations>
  `;
};

SlideUpRight.story = {
  name: 'Slide up right',
};

export const SlideRight = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <c4d-scroll-animations
      animation="slide-right"
      selector-targets="${selectorTargets}"
      keep-animation="${true}">
      ${StoryContent()}
    </c4d-scroll-animations>
  `;
};

SlideRight.story = {
  name: 'Slide right',
};

export const SlideDownRight = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <c4d-scroll-animations
      animation="slide-down-right"
      selector-targets="${selectorTargets}"
      keep-animation="${true}">
      ${StoryContent()}
    </c4d-scroll-animations>
  `;
};

SlideDownRight.story = {
  name: 'Slide down right',
};

export const SlideDown = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <c4d-scroll-animations
      animation="slide-down"
      selector-targets="${selectorTargets}"
      keep-animation="${true}">
      ${StoryContent()}
    </c4d-scroll-animations>
  `;
};

SlideDown.story = {
  name: 'Slide down',
};

export const SlideDownLeft = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <c4d-scroll-animations
      animation="slide-down-left"
      selector-targets="${selectorTargets}"
      keep-animation="${true}">
      ${StoryContent()}
    </c4d-scroll-animations>
  `;
};

SlideDownLeft.story = {
  name: 'Slide down left',
};

export const SlideLeft = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <c4d-scroll-animations
      animation="slide-left"
      selector-targets="${selectorTargets}"
      keep-animation="${true}">
      ${StoryContent()}
    </c4d-scroll-animations>
  `;
};

SlideLeft.story = {
  name: 'Slide left',
};

export const SlideUpLeft = () => {
  return html`
    <style>
      ${fadeStyles.cssText}
      ${fadeOptions.cssText}
    </style>
    <c4d-scroll-animations
      animation="slide-up-left"
      selector-targets="${selectorTargets}"
      keep-animation="${true}">
      ${StoryContent()}
    </c4d-scroll-animations>
  `;
};

SlideUpLeft.story = {
  name: 'Slide up left',
};

export default {
  title: 'Components/Scroll animations',
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    percy: {
      skip: true,
    },
  },
  decorators: [
    (story) => html`
      <div class="cds--grid" style="padding: 0">${story()}</div>
    `,
  ],
};
