/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text } from '@storybook/addon-knobs';
import React from 'react';

// @ts-ignore
import { ArrowRight } from '@carbon/icons-react';
import C4DFeatureCard from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card';
import C4DFeatureCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card-footer';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import mediumImgSm4x3 from '../../../../.storybook/storybook-images/assets/320/fpo--4x3--320x160--004.jpg';
import imgSm4x3 from '../../../../.storybook/storybook-images/assets/480/fpo--4x3--480x360--005.jpg';
import imgMd1x1 from '../../../../.storybook/storybook-images/assets/480/fpo--1x1--480x480--005.jpg';
import imgLg1x1 from '../../../../.storybook/storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import imgXlg1x1 from '../../../../.storybook/storybook-images/assets/1312/fpo--1x1--1312x1312--002.jpg';
import imgMax1x1 from '../../../../.storybook/storybook-images/assets/1584/fpo--1x1--1584x1584--002.jpg';

import readme from './README.stories.react.mdx';

const iconProps = {
  size: 20,
  slot: 'icon',
};

export const Medium = (args) => {
  const { heading, href } = args?.FeatureCard ?? {};
  return (
    <C4DFeatureCard href={href}>
      <C4DImage alt="Image alt text" defaultSrc={imgMax1x1} slot="image">
        <C4DImageItem media="(min-width: 1312px)" srcset={imgXlg1x1} />
        <C4DImageItem media="(min-width: 1056px)" srcset={imgXlg1x1} />
        <C4DImageItem media="(min-width: 991px)" srcset={imgLg1x1} />
        <C4DImageItem media="(min-width: 672px)" srcset={imgMd1x1} />
        <C4DImageItem media="(min-width: 0px)" srcset={mediumImgSm4x3} />
      </C4DImage>
      <C4DCardHeading>{heading}</C4DCardHeading>
      <C4DFeatureCardFooter>
        <ArrowRight {...iconProps} />
      </C4DFeatureCardFooter>
    </C4DFeatureCard>
  );
};

export const Large = (args) => {
  const { copy, eyebrow, heading, href } = args?.FeatureCard ?? {};
  return (
    <C4DFeatureCard href={href} size="large">
      <C4DImage alt="Image alt text" defaultSrc={imgLg1x1} slot="image">
        <C4DImageItem media="(min-width: 1312px)" srcset={imgXlg1x1} />
        <C4DImageItem media="(min-width: 1056px)" srcset={imgXlg1x1} />
        <C4DImageItem media="(min-width: 991px)" srcset={imgLg1x1} />
        <C4DImageItem media="(min-width: 672px)" srcset={imgMd1x1} />
        <C4DImageItem media="(min-width: 0px)" srcset={imgSm4x3} />
      </C4DImage>
      <C4DCardEyebrow>{eyebrow}</C4DCardEyebrow>
      <C4DCardHeading>{heading}</C4DCardHeading>
      <p>{copy}</p>
      <C4DFeatureCardFooter>
        <ArrowRight {...iconProps} />
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
