/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import FeatureCard from '../FeatureCard';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--003.jpg';
import React from 'react';
import readme from '../README.stories.mdx';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Components|Feature card',

  parameters: {
    ...readme.parameters,
    knobs: {
      FeatureCard: ({ groupId }) => ({
        card: {
          heading: text(
            'Card Heading (heading):',
            'Explore AI use cases in all industries',
            groupId
          ),
          image: {
            defaultSrc: imgLg1x1,
            alt: 'Image alt text',
          },
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
        },
      }),
    },
    propsSet: {
      default: {
        FeatureCard: {
          card: {
            heading: 'Explore AI use cases in all industries',
            image: {
              defaultSrc: imgLg1x1,
              alt: 'Image alt text',
            },
            cta: {
              href: 'https://www.example.com',
              icon: {
                src: ArrowRight20,
              },
            },
          },
        },
      },
    },
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
          <FeatureCard card={card} />
        </div>
      </div>
    </div>
  );
};
