/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text } from '@storybook/addon-knobs';
import React from 'react';

// @ts-ignore
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import C4DFeatureCard from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card';
import C4DFeatureCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card-footer';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import mediumImgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--004.jpg';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--002.jpg';
import imgMax2x1 from '../../../../../storybook-images/assets/1584/fpo--2x1--1312x656--002.jpg';
import imgSm2x1 from '../../../../../storybook-images/assets/320/fpo--2x1--320x160--002.jpg';
import imgXlg2x1 from '../../../../../storybook-images/assets/1312/fpo--2x1--1312x656--002.jpg';

import readme from './README.stories.react.mdx';

export const Medium = (args) => {
  const { heading, href } = args?.FeatureCard ?? {};
  return (
    <C4DFeatureCard href={href}>
      <C4DImage alt="Image alt text" defaultSrc={mediumImgLg1x1} slot="image" />
      <C4DCardHeading>{heading}</C4DCardHeading>
      <C4DFeatureCardFooter>
        <ArrowRight20 slot="icon" />
      </C4DFeatureCardFooter>
    </C4DFeatureCard>
  );
};

export const Large = (args) => {
  const { copy, eyebrow, heading, href } = args?.FeatureCard ?? {};
  return (
    <C4DFeatureCard href={href} size="large">
      <C4DImage alt="Image alt text" defaultSrc={imgLg1x1} slot="image">
        <C4DImageItem media="(min-width: 1312px)" srcset={imgMax2x1} />
        <C4DImageItem media="(min-width: 1056px)" srcset={imgXlg2x1} />
        <C4DImageItem media="(min-width: 991px)" srcset={imgXlg2x1} />
        <C4DImageItem media="(min-width: 672px)" srcset={imgLg2x1} />
        <C4DImageItem media="(min-width: 0px)" srcset={imgSm2x1} />
      </C4DImage>
      <C4DCardEyebrow>{eyebrow}</C4DCardEyebrow>
      <C4DCardHeading>{heading}</C4DCardHeading>
      <p>{copy}</p>
      <C4DFeatureCardFooter>
        <ArrowRight20 slot="icon" />
      </C4DFeatureCardFooter>
    </C4DFeatureCard>
  );
};

Medium.story = {
  parameters: {
    ...readme.parameters,
    storyGrid: 'cds-col-sm-4 cds--col-lg-8',
    knobs: {
      FeatureCard: () => ({
        heading: text(
          'Heading (heading)',
          'Explore AI use cases in all industries'
        ),
        href: text('Href (href)', 'https://www.example.com'),
      }),
    },
  },
};

Large.story = {
  parameters: {
    ...readme.parameters,
    storyGrid: 'cds-col-sm-4 cds--col-lg-12',
    knobs: {
      FeatureCard: () => ({
        copy: text(
          'Copy (copy)',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
        ),
        heading: text(
          'Heading (heading)',
          'Explore AI use cases in all industries'
        ),
        href: text('Href (href)', 'https://www.example.com'),
        eyebrow: text('Eyebrow (eyebrow)', 'This is an eyebrow'),
      }),
    },
  },
};

export default {
  title: 'Components/Feature card',
  decorators: [
    (story, { parameters }) => {
      return (
        <div className="cds-grid">
          <div className="cds-row">
            <div className={parameters.storyGrid}>{story()}</div>
          </div>
        </div>
      );
    },
  ],
  parameters: {
    hasStoryPadding: true,
  },
};
