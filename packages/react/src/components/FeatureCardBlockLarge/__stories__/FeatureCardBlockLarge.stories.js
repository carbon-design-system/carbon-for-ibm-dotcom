/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import FeatureCardBlockLarge from '../FeatureCardBlockLarge';
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
              src:
                'https://fpoimg.com/320x160?text=2:1&bg_color=ee5396&text_color=161616',
              breakpoint: 'sm',
            },
            {
              src:
                'https://fpoimg.com/400x200?text=2:1&bg_color=ee5396&text_color=161616',
              breakpoint: 'md',
            },
            {
              src:
                'https://fpoimg.com/600x600?text=1:1&bg_color=ee5396&text_color=161616',
              breakpoint: 991,
            },
            {
              src:
                'https://fpoimg.com/600x300?text=2:1&bg_color=ee5396&text_color=161616',
              breakpoint: 'lg',
            },
            {
              src:
                'https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616',
              breakpoint: 'xlg',
            },
          ],
          defaultSrc:
            'https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616',
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
            defaultSrc:
              'https://fpoimg.com/600x300?text=2:1&bg_color=ee5396&text_color=161616',
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
