/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import FeatureCard from '../FeatureCard';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import imgMax1x1 from '../../../../../storybook-images/assets/1584/fpo--1x1--1584x1584--002.jpg';
import imgMd2x1 from '../../../../../storybook-images/assets/480/fpo--2x1--480x240--002.jpg';
import imgSm2x1 from '../../../../../storybook-images/assets/320/fpo--2x1--320x160--002.jpg';
import imgXlg2x1 from '../../../../../storybook-images/assets/1312/fpo--2x1--1312x656--002.jpg';
import mediumImgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--004.jpg';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Components/Feature card',
  parameters: {
    ...readme.parameters,
  },
};

export const Default = ({ parameters }) => {
  const { card } = parameters?.props?.FeatureCard ?? {};

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div
          style={{ paddingTop: '20px' }}
          className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <FeatureCard card={card} size={'medium'} />
        </div>
      </div>
    </div>
  );
};

Default.story = {
  name: 'Medium',
  parameters: {
    ...readme.parameters,
    knobs: {
      FeatureCard: ({ groupId }) => ({
        card: {
          heading: text(
            'Card heading:',
            'Explore AI use cases in all industries',
            groupId
          ),
          image: {
            defaultSrc: mediumImgLg1x1,
            alt: 'Image alt text',
          },
          cta: {
            href: 'https://www.example.com',
            icon: {
              src: ArrowRight20,
            },
          },
        },
      }),
    },
  },
};

export const Large = ({ parameters }) => {
  const { card } = parameters?.props?.FeatureCard ?? {};

  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div
          style={{ paddingTop: '20px' }}
          className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-2">
          <FeatureCard card={card} size={'large'} />
        </div>
      </div>
    </div>
  );
};

Large.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      FeatureCard: ({ groupId }) => ({
        card: {
          eyebrow: text('Card eyebrow:', 'This is an eyebrow', groupId),
          heading: text(
            'Card heading:',
            'Explore AI use cases in all industries',
            groupId
          ),
          copy: text(
            'Card copy:',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            groupId
          ),
          cta: {
            href: 'https://www.example.com',
            icon: {
              src: ArrowRight20,
            },
          },
          image: {
            sources: [
              {
                src: imgSm2x1,
                breakpoint: 'sm',
              },
              {
                src: imgMd2x1,
                breakpoint: 'md',
              },
              {
                src: imgLg1x1,
                breakpoint: 991,
              },
              {
                src: imgXlg2x1,
                breakpoint: 'lg',
              },
              {
                src: imgMax1x1,
                breakpoint: 'xlg',
              },
            ],
            defaultSrc: imgXlg2x1,
            alt: 'Image alt text',
          },
        },
      }),
    },
  },
};
