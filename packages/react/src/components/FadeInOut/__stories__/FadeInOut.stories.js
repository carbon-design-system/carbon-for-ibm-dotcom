/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/ibmdotcom-styles/scss/internal/scroll-into-view/_scroll-into-view.scss';
import './fade-in-out.stories.scss';

import Content from '../../DotcomShell/__stories__/data/content';
import DotcomShell from '../../DotcomShell/DotcomShell';
import FadeInOut from '../FadeInOut';
import { Default as footerStory } from '../../Footer/__stories__/Footer.stories.js';
import { Default as mastheadStory } from '../../Masthead/__stories__/Masthead.stories.js';
import React from 'react';
import readme from '../README.stories.mdx';
import { select } from '@storybook/addon-knobs';

const footerTypeOptions = {
  tall: 'tall',
  short: 'short',
  micro: 'micro',
};

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
  title: 'Components|Fade In Out',

  parameters: {
    ...readme.parameters,
    'carbon-theme': { disabled: true },
    knobs: {
      escapeHTML: false,
      DotcomShell: () => {
        const {
          Masthead: mastheadKnobs,
        } = mastheadStory.story.parameters.knobs;
        const { Footer: footerKnobs } = footerStory.story.parameters.knobs;
        return {
          mastheadProps: mastheadKnobs({ groupId: 'Masthead' }),
          footerProps: {
            ...footerKnobs({ groupId: 'Footer' }),
            type: select(
              'Footer (footerProps): sets the type of footer (type)',
              footerTypeOptions,
              footerTypeOptions.tall,
              'Footer'
            ),
          },
        };
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { mastheadProps, footerProps } = parameters?.props?.DotcomShell ?? {};
  return (
    <DotcomShell mastheadProps={mastheadProps} footerProps={footerProps}>
      <main id="main-content">
        <div style={{ paddingTop: '6rem' }}>
          <FadeInOut selectorTargets={selectorTargets}>
            <Content />
          </FadeInOut>
        </div>
      </main>
    </DotcomShell>
  );
};

Default.story = {
  // to avoid jest errors with Intersection Observer
  parameters: {
    storyshots: { disable: true },
  },
};

export const WithContinuousAnimations = ({ parameters }) => {
  const { mastheadProps, footerProps } = parameters?.props?.DotcomShell ?? {};
  return (
    <DotcomShell mastheadProps={mastheadProps} footerProps={footerProps}>
      <main id="main-content">
        <div style={{ paddingTop: '6rem' }}>
          <FadeInOut selectorTargets={selectorTargets} keepAnimations={true}>
            <Content />
          </FadeInOut>
        </div>
      </main>
    </DotcomShell>
  );
};

WithContinuousAnimations.story = {
  // to avoid jest errors with Intersection Observer
  parameters: {
    storyshots: { disable: true },
  },
};
