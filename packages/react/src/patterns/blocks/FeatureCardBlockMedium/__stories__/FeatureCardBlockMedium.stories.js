/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { object, text } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import FeatureCardBlockMedium from '../FeatureCardBlockMedium';
import React from 'react';
import readme from '../README.stories.mdx';

export default {
  title: 'Patterns (Blocks)|FeatureCardBlockMedium',

  parameters: {
    ...readme.parameters,
    knobs: {
      FeatureCardBlockMedium: ({ groupId }) => ({
        heading: text(
          'Pattern heading(required):',
          'How is artificial intelligence used today in your industry?',
          groupId
        ),
        card: {
          heading: text(
            'Card Heading:',
            'Explore AI use cases in all industries',
            groupId
          ),
          cta: {
            href: text('Card href:', 'https://www.example.com', groupId),
            icon: {
              src: ArrowRight20,
            },
          },
          image: object(
            'card image',
            {
              defaultSrc:
                'https://dummyimage.com/672x672/ee5396/161616&text=1x1',
              alt: 'Image alt text',
            },
            groupId
          ),
        },
      }),
    },
    props: {
      FeatureCardBlockMedium: {
        heading: 'How is artificial intelligence used today in your industry?',
        card: {
          cta: {
            href: 'https://www.example.com',
            icon: ArrowRight20,
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
