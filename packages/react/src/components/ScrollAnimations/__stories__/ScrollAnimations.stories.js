/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/ibmdotcom-styles/scss/components/scroll-into-view/_scroll-into-view.scss';
import './scroll-animations.stories.scss';

import Content from '../../DotcomShell/__stories__/data/content';
import React from 'react';
import readme from '../README.stories.mdx';
import ScrollAnimations from '../ScrollAnimations';

const selectorTargets = `
  .bx--content-block__heading,
  .bx--content-block__copy,
  .bx--leadspace-block__media,
  .bx--link-list,
  .bx--leadspace-block__cta,
  .bx--feature-card-block-large,
  .bx--content-group,
  .bx--image,
  .bx--content-block__cta,
  .bx--callout-with-media,
  .bx--content-item-horizontal__item,
  .bx--logo-grid__col,
  .bx--card-group__cards__col,
  .bx--callout-quote,
  .bx--cta-section,
  .bx--cta-section__cta,
  .bx--content-item
`;

export default {
  title: 'Components/Scroll animations',
  parameters: {
    ...readme.parameters,
    'carbon-theme': { disabled: true },
    percy: {
      skip: true,
    },
  },
};

export const Default = () => {
  return (
    <main id="main-content">
      <div style={{ paddingTop: '6rem' }}>
        <ScrollAnimations selectorTargets={selectorTargets}>
          <Content />
        </ScrollAnimations>
      </div>
    </main>
  );
};

Default.story = {
  // to avoid jest errors with Intersection Observer
  parameters: {
    storyshots: { disable: true },
  },
};

export const WithContinuousAnimations = () => {
  return (
    <main id="main-content">
      <div style={{ paddingTop: '6rem' }}>
        <ScrollAnimations
          animation={'fade'}
          selectorTargets={selectorTargets}
          keepAnimations={true}
        >
          <Content />
        </ScrollAnimations>
      </div>
    </main>
  );
};

WithContinuousAnimations.story = {
  // to avoid jest errors with Intersection Observer
  parameters: {
    storyshots: { disable: true },
  },
};

export const SlideUp = () => {
  return (
    <main id="main-content">
      <div style={{ paddingTop: '6rem' }}>
        <ScrollAnimations
          animation={'slide-up'}
          selectorTargets={selectorTargets}
          keepAnimations={true}
        >
          <Content />
        </ScrollAnimations>
      </div>
    </main>
  );
};

SlideUp.story = {
  name: 'Slide up',
  // to avoid jest errors with Intersection Observer
  parameters: {
    storyshots: { disable: true },
  },
};

export const SlideUpRight = () => {
  return (
    <main id="main-content">
      <div style={{ paddingTop: '6rem' }}>
        <ScrollAnimations
          animation={'slide-up-right'}
          selectorTargets={selectorTargets}
          keepAnimations={true}
        >
          <Content />
        </ScrollAnimations>
      </div>
    </main>
  );
};

SlideUpRight.story = {
  name: 'Slide up right',
  // to avoid jest errors with Intersection Observer
  parameters: {
    storyshots: { disable: true },
  },
};

export const SlideRight = () => {
  return (
    <main id="main-content">
      <div style={{ paddingTop: '6rem' }}>
        <ScrollAnimations
          animation={'slide-right'}
          selectorTargets={selectorTargets}
          keepAnimations={true}
        >
          <Content />
        </ScrollAnimations>
      </div>
    </main>
  );
};

SlideRight.story = {
  name: 'Slide right',
  // to avoid jest errors with Intersection Observer
  parameters: {
    storyshots: { disable: true },
  },
};

export const SlideDownRight = () => {
  return (
    <main id="main-content">
      <div style={{ paddingTop: '6rem' }}>
        <ScrollAnimations
          animation={'slide-down-right'}
          selectorTargets={selectorTargets}
          keepAnimations={true}
        >
          <Content />
        </ScrollAnimations>
      </div>
    </main>
  );
};

SlideDownRight.story = {
  name: 'Slide down right',
  // to avoid jest errors with Intersection Observer
  parameters: {
    storyshots: { disable: true },
  },
};

export const SlideDown = () => {
  return (
    <main id="main-content">
      <div style={{ paddingTop: '6rem' }}>
        <ScrollAnimations
          animation={'slide-down'}
          selectorTargets={selectorTargets}
          keepAnimations={true}
        >
          <Content />
        </ScrollAnimations>
      </div>
    </main>
  );
};

SlideDown.story = {
  name: 'Slide down',
  // to avoid jest errors with Intersection Observer
  parameters: {
    storyshots: { disable: true },
  },
};

export const SlideDownLeft = () => {
  return (
    <main id="main-content">
      <div style={{ paddingTop: '6rem' }}>
        <ScrollAnimations
          animation={'slide-down-left'}
          selectorTargets={selectorTargets}
          keepAnimations={true}
        >
          <Content />
        </ScrollAnimations>
      </div>
    </main>
  );
};

SlideDownLeft.story = {
  name: 'Slide down left',
  // to avoid jest errors with Intersection Observer
  parameters: {
    storyshots: { disable: true },
  },
};

export const SlideLeft = () => {
  return (
    <main id="main-content">
      <div style={{ paddingTop: '6rem' }}>
        <ScrollAnimations
          animation={'slide-left'}
          selectorTargets={selectorTargets}
          keepAnimations={true}
        >
          <Content />
        </ScrollAnimations>
      </div>
    </main>
  );
};

SlideLeft.story = {
  name: 'Slide left',
  // to avoid jest errors with Intersection Observer
  parameters: {
    storyshots: { disable: true },
  },
};

export const SlideUpLeft = () => {
  return (
    <main id="main-content">
      <div style={{ paddingTop: '6rem' }}>
        <ScrollAnimations
          animation={'slide-up-left'}
          selectorTargets={selectorTargets}
          keepAnimations={true}
        >
          <Content />
        </ScrollAnimations>
      </div>
    </main>
  );
};

SlideUpLeft.story = {
  // to avoid jest errors with Intersection Observer
  parameters: {
    storyshots: { disable: true },
  },
};
