/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import './index.scss';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { DDS_FEATURED_LINK } from '../../../../internal/FeatureFlags';
import FeaturedLink from '../FeaturedLink';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

if (DDS_FEATURED_LINK) {
  storiesOf('Patterns (Blocks)|Feature Card', module)
    .addDecorator(withKnobs)
    .addParameters({
      readme: {
        sidebar: readme,
      },
    })
    .add('Default', () => {
      const heading = text(
        'Pattern heading(required):',
        'How is artificial intelligence used today in your industry?'
      );

      const cardheading = text(
        'Card Heading:',
        'Explore AI use cases in all industries'
      );
      const cardhref = text('Card href:', 'https://www.example.com');
      const images = object('card image', {
        images: [
          {
            src: 'https://dummyimage.com/320x160/ee5396/161616&text=2:1',
            minWidth: 'sm',
          },
          {
            src: 'https://dummyimage.com/400x400/ee5396/161616&text=1:1',
            minWidth: 'md',
          },
          {
            src: 'https://dummyimage.com/672x672/ee5396/161616&text=1:1',
            minWidth: 'lg',
          },
        ],
        defaultImage: 'https://dummyimage.com/672x672/ee5396/161616&text=1:1',
        alt: 'Image alt text',
      });

      return (
        <div className="bx--grid ">
          <div className="bx--row">
            <div className="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4">
              <FeaturedLink
                heading={heading}
                card={{
                  heading: cardheading,
                  image: images,
                  cta: {
                    href: cardhref,
                  },
                }}
              />
            </div>
          </div>
        </div>
      );
    });
}
