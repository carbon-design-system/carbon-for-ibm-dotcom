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
import DDSFeatureCard from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card';
import DDSFeatureCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card-footer';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import mediumImgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--004.jpg';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--002.jpg';
import imgMax2x1 from '../../../../../storybook-images/assets/1584/fpo--2x1--1312x656--002.jpg';
import imgSm2x1 from '../../../../../storybook-images/assets/320/fpo--2x1--320x160--002.jpg';
import imgXlg2x1 from '../../../../../storybook-images/assets/1312/fpo--2x1--1312x656--002.jpg';

import readme from './README.stories.react.mdx';

export const Medium = args => {
  const { heading, href } = args ?? {};
  return (
    <DDSFeatureCard href={href}>
      <DDSImage alt="Image alt text" defaultSrc={mediumImgLg1x1} slot="image" />
      <DDSCardHeading>{heading}</DDSCardHeading>
      <DDSFeatureCardFooter>
        <ArrowRight20 slot="icon" />
      </DDSFeatureCardFooter>
    </DDSFeatureCard>
  );
};

export const Large = args => {
  const { copy, eyebrow, heading, href } = args ?? {};
  return (
    <DDSFeatureCard href={href} size="large">
      <DDSImage alt="Image alt text" defaultSrc={imgLg1x1} slot="image">
        <DDSImageItem media="(min-width: 1312px)" srcset={imgMax2x1} />
        <DDSImageItem media="(min-width: 1056px)" srcset={imgXlg2x1} />
        <DDSImageItem media="(min-width: 991px)" srcset={imgXlg2x1} />
        <DDSImageItem media="(min-width: 672px)" srcset={imgLg2x1} />
        <DDSImageItem media="(min-width: 0px)" srcset={imgSm2x1} />
      </DDSImage>
      <DDSCardEyebrow>{eyebrow}</DDSCardEyebrow>
      <DDSCardHeading>{heading}</DDSCardHeading>
      <p>{copy}</p>
      <DDSFeatureCardFooter>
        <ArrowRight20 slot="icon" />
      </DDSFeatureCardFooter>
    </DDSFeatureCard>
  );
};

Medium.story = {
  parameters: {
    ...readme.parameters,
    storyGrid: 'bx--col-sm-4 bx--col-lg-8',
    knobs: {
      FeatureCard: () => ({
        heading: text('Heading (heading)', 'Explore AI use cases in all industries'),
        href: text('Href (href)', 'https://www.example.com'),
      }),
    },
  },
};

Large.story = {
  parameters: {
    ...readme.parameters,
    storyGrid: 'bx--col-sm-4 bx--col-lg-12',
    knobs: {
      FeatureCard: () => ({
        copy: text(
          'Copy (copy)',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
        ),
        heading: text('Heading (heading)', 'Explore AI use cases in all industries'),
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
        <div className="bx--grid">
          <div className="bx--row">
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
