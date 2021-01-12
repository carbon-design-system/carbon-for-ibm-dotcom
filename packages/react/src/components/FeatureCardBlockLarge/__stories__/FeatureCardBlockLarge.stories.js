/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import FeatureCardBlockLarge from '../FeatureCardBlockLarge';
import img1312_2x1 from '../../../../../storybook-images/assets/1312/fpo--2x1--1312x656--005.jpg';
import img1584_1x1 from '../../../../../storybook-images/assets/1584/fpo--1x1--1584x1584--005.jpg';
import img320_2x1 from '../../../../../storybook-images/assets/320/fpo--2x1--320x160--005.jpg';
import img480_2x1 from '../../../../../storybook-images/assets/480/fpo--2x1--480x240--005.jpg';
import img720_1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--005.jpg';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Components|FeatureCardBlockLarge',

  parameters: {
    ...readme.parameters,
    knobs: {
      FeatureCardBlockLarge: ({ groupId }) => ({
        eyebrow: text(
          'Card eyebrow(required) (eyebrow):',
          'This is an eyebrow',
          groupId
        ),
        heading: text(
          'Card heading (heading):',
          'Explore AI use cases in all industries',
          groupId
        ),
        copy: text(
          'Card copy (copy):',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          groupId
        ),
        cta: {
          href: text(
            'Card href (cta.href):',
            'https://www.example.com',
            groupId
          ),
          icon: {
            src: ArrowRight20,
          },
        },
        image: {
          sources: [
            {
              src: img320_2x1,
              breakpoint: 'sm',
            },
            {
              src: img480_2x1,
              breakpoint: 'md',
            },
            {
              src: img720_1x1,
              breakpoint: 991,
            },
            {
              src: img1312_2x1,
              breakpoint: 'lg',
            },
            {
              src: img1584_1x1,
              breakpoint: 'xlg',
            },
          ],
          defaultSrc: img1312_2x1,
          alt: 'Image alt text',
        },
      }),
    },
    propsSet: {
      default: {
        FeatureCardBlockLarge: {
          eyebrow: 'this is an eyebrow',
          heading: 'Explore AI use cases in all industries',
          cta: {
            href: 'https://www.example.com',
            src: ArrowRight20,
          },
          image: {
            defaultSrc: img1312_2x1,
            alt: 'Image alt text',
          },
        },
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { eyebrow, heading, copy, cta, image } =
    parameters?.props?.FeatureCardBlockLarge ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-2">
          <FeatureCardBlockLarge
            eyebrow={eyebrow}
            heading={heading}
            copy={copy}
            cta={cta}
            image={image}
          />
        </div>
      </div>
    </div>
  );
};
