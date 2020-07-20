/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import FeatureCardBlockMedium from '../FeatureCardBlockMedium';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Components|FeatureCardBlockMedium',

  parameters: {
    ...readme.parameters,
    knobs: {
      FeatureCardBlockMedium: ({ groupId }) => ({
        heading: text(
          'Pattern heading(required, heading):',
          'How is artificial intelligence used today in your industry?',
          groupId
        ),
        card: {
          heading: text(
            'Card Heading (heading):',
            'Explore AI use cases in all industries',
            groupId
          ),
          image: {
            defaultSrc: text(
              'Image src (defaultSrc):',
              'https://dummyimage.com/672x672/ee5396/161616&text=1x1',
              groupId
            ),
            alt: text(
              'Image alt text (alt):',
              'Image alt text',
              groupId
            ),
          },
          cta: {
            href: text(
              'Card href (href):',
              'https://www.example.com',
              groupId
            ),
            icon: {
              src: ArrowRight20,
            },
          },
        },
      }),
    },
    propsSet: {
      default: {
        FeatureCardBlockMedium: {
          heading:
            'How is artificial intelligence used today in your industry?',
          card: {
            heading: 'Explore AI use cases in all industries',
            cta: {
              href: 'https://www.example.com',
              icon: {
                src: ArrowRight20,
              },
            },
            image: {
              defaultSrc:
                'https://dummyimage.com/672x672/ee5396/161616&text=1x1',
              alt: 'Image alt text',
            },
          },
        },
      },
    },
  },
};

export const Default = ({ parameters }) => {
  const { heading, card } = parameters?.props?.FeatureCardBlockMedium ?? {};
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
          <FeatureCardBlockMedium heading={heading} card={card} />
        </div>
      </div>
    </div>
  );
};
